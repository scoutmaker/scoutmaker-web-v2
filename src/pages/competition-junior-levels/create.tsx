import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateCompetitionJuniorLevelForm } from '@/modules/competition-junior-levels/forms/create'
import { useCreateCompetitionJuniorLevel } from '@/modules/competition-junior-levels/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'comp-junior-levels'],
  ['ADMIN'],
)

const CreateCompetitionJuniorLevelPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createCompJuniorLevel, isLoading: createLoading } =
    useCreateCompetitionJuniorLevel()

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {createLoading && <Loader />}
      <PageHeading title={t('comp-junior-levels:CREATE_PAGE_TITLE')} />
      <CreateCompetitionJuniorLevelForm onSubmit={createCompJuniorLevel} />
    </>
  )
}

export default CreateCompetitionJuniorLevelPage
