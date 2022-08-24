import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditPlayerPositionForm } from '@/modules/player-positions/forms/edit'
import { useUpdatePlayerPosition } from '@/modules/player-positions/hooks'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { getPlayerPositionById } from '@/services/api/methods/player-positions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<PlayerPositionDto>(['common', 'player-positions'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getPlayerPositionById(
        +(params?.id as string),
        token,
      )
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError
      }
    }
  });

const EditPlayerPositionPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<PlayerPositionDto>) => {
  const { t } = useTranslation()

  const { mutate: updatePlayerPosition, isLoading: updateLoading } = useUpdatePlayerPosition(
    data?.id || 0,
  )

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading
        title={t('player-positions:EDIT_PAGE_TITLE')}
      />
      <EditPlayerPositionForm
        current={data}
        onSubmit={updatePlayerPosition}
      />
    </>
  )
}

export default EditPlayerPositionPage
