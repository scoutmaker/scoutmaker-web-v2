import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { withSessionSsr } from '@/modules/auth/session'
import { redirectToLogin } from '@/utils/redirect-to-login'
import { isPrivilegedUser } from '@/utils/user-roles'

export const getServerSideProps = withSessionSsr(
  async ({ req, res, locale }) => {
    const { user } = req.session

    if (!user || !isPrivilegedUser(user)) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const ReportSkillAssessmentCategoriesPage = () => (
  <h1>Report Skill Assessment Categories</h1>
)

export default ReportSkillAssessmentCategoriesPage
