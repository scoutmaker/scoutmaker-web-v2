import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PrimaryLayout } from '../../layout/primary-layout'
import { withSessionSsr } from '../../lib/session'
import { redirectToLogin } from '../../utils/redirect-to-login'

export const getServerSideProps = withSessionSsr(
  async ({ locale, req, res }) => {
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

const ClubsPage = () => (
  <PrimaryLayout>
    <h1>Clubs</h1>
  </PrimaryLayout>
)

export default ClubsPage
