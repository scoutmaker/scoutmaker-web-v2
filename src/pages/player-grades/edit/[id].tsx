import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditPlayerGradeForm } from '@/modules/player-grades/forms/edit'
import { useUpdatePlayerGrade } from '@/modules/player-grades/hooks'
import { PlayerGradeDto } from '@/modules/player-grades/types'
import { usePlayersList } from '@/modules/players/hooks'
import { getPlayerGradeById } from '@/services/api/methods/player-grades'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<PlayerGradeDto>(
  ['common', 'player-grades'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getPlayerGradeById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditPlayerGradePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<PlayerGradeDto>) => {
  const { t } = useTranslation()

  const { mutate: updatePlayerGrade, isLoading: updateLoading } =
    useUpdatePlayerGrade(data?.id || '')

  const { data: playersData, isLoading: playersLoading } = usePlayersList()

  const isLoading = updateLoading || playersLoading

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-grades:EDIT_PAGE_TITLE')} />
      <EditPlayerGradeForm
        current={data}
        onSubmit={updatePlayerGrade}
        playersData={playersData || []}
      />
    </>
  )
}

export default EditPlayerGradePage
