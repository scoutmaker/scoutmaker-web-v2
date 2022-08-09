import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditCompetitionAgeCategoryForm } from '@/modules/competition-age-categories/forms/edit'
import { useUpdateCompetitionAgeCategory } from '@/modules/competition-age-categories/hooks'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { getCompetitionAgeCategoryById } from '@/services/api/methods/competition-age-categories'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CompetitionAgeCategortyDto>(['common', 'comp-age-categ'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getCompetitionAgeCategoryById(
        +(params?.id as string), token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const EditCompAgeCategPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CompetitionAgeCategortyDto>) => {
  const { t } = useTranslation()

  const { mutate: updateCompAgeCateg, isLoading: isUpdateLoading } = useUpdateCompetitionAgeCategory(
    data?.id || 0,
  )

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isUpdateLoading && <Loader />}
      <PageHeading
        title={t('comp-age-categ:EDIT_PAGE_TITLE')}
      />
      <EditCompetitionAgeCategoryForm
        current={data}
        onSubmit={updateCompAgeCateg}
      />
    </>
  )
}

export default EditCompAgeCategPage
