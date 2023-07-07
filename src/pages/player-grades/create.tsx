import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreatePlayerGradeForm } from '@/modules/player-grades/forms/create'
import { useCreatePlayerGrade } from '@/modules/player-grades/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'player-grades'],
  ['ADMIN'],
)

const CreatePlayerGradePage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createPlayerGrade, isLoading: createLoading } =
    useCreatePlayerGrade()

  const { data: playersData, isLoading: playersLoading } = usePlayersList()

  const isLoading = createLoading || playersLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-grades:CREATE_PAGE_TITLE')} />
      <CreatePlayerGradeForm
        onSubmit={createPlayerGrade}
        playersData={playersData || []}
      />
    </>
  )
}

export default CreatePlayerGradePage
