import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { CreateCompetitionAgeCategoryForm } from '@/modules/competition-age-categories/forms/create'
import { useCreateCompetitionAgeCategory } from '@/modules/competition-age-categories/hooks'
import { redirectToLogin } from '@/utils/redirect-to-login'

// TO_CHANGE
export const getServerSideProps = withSessionSsr(
  async ({ req, res, locale }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'comp-age-categ',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const CreateCompetitionAgeCategoryPage = () => {
  const { t } = useTranslation()

  const { mutate: createCompAgeCateg, isLoading } = useCreateCompetitionAgeCategory()

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
