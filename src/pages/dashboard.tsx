import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { withSessionSsr } from '../lib/session'

export const getServerSideProps = withSessionSsr(async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'pl', ['common'])

  return {
    props: {
      ...translations,
    },
  }
})

const DashboardPage = () => <h1>Dashboard</h1>

export default DashboardPage
