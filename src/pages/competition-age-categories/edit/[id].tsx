import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { EditCompetitionAgeCategoryForm } from '@/modules/competition-age-categories/forms/edit'
import { useUpdateCompetitionAgeCategory } from '@/modules/competition-age-categories/hooks'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { getCompetitionAgeCategoryById } from '@/services/api/methods/competition-age-categories'
import { ApiError } from '@/services/api/types'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TEditPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  data: CompetitionAgeCategortyDto | null
}
// TO_CHANGE
export const getServerSideProps = withSessionSsr<TEditPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          data: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'comp-age-categ',
    ])

    let data: CompetitionAgeCategortyDto

    try {
      data = await getCompetitionAgeCategoryById(
        +(params?.id as string),
        req.session.token,
      )
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          data: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        data,
      },
    }
  },
)

const EditClubPage = ({
  data,
  errorMessage,
  errorStatus,
}: TEditPageProps) => {
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

export default EditClubPage
