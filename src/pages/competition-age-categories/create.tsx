import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateCompetitionAgeCategoryForm } from '@/modules/competition-age-categories/forms/create'
import { useCreateCompetitionAgeCategory } from '@/modules/competition-age-categories/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'comp-age-categ'], ['ADMIN'])

const CreateCompetitionAgeCategoryPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createCompAgeCateg, isLoading } = useCreateCompetitionAgeCategory()
  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('comp-age-categ:CREATE_PAGE_TITLE')} />
      <CreateCompetitionAgeCategoryForm
        onSubmit={createCompAgeCateg}
      />
    </>
  )
}

export default CreateCompetitionAgeCategoryPage
