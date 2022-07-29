import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { withSessionSsr } from '@/modules/auth/session'
import { redirectToLogin } from '@/utils/redirect-to-login'

export const getServerSideProps = withSessionSsr(
  async ({ req, res, locale }) => {
    const { user } = req.session

    if (!user) {
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

const MatchesPage = () => <h1>Matches</h1>

export default MatchesPage
