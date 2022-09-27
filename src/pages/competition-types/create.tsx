import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateCompetitionTypeForm } from '@/modules/competition-types/forms/create'
import { useCreateCompetitionType } from '@/modules/competition-types/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'competition-types'],
  ['ADMIN'],
)

const CreateCompetitionTypePage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createCompType, isLoading: createLoading } =
    useCreateCompetitionType()

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {createLoading && <Loader />}
      <PageHeading title={t('competition-types:CREATE_PAGE_TITLE')} />
      <CreateCompetitionTypeForm onSubmit={createCompType} />
    </>
  )
}

export default CreateCompetitionTypePage
