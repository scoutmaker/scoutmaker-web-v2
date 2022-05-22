import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { LoginForm } from '../components/login-form'
import { SecondaryLayout } from '../layout/secondary-layout'
import { LoginDto } from '../types/auth'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'pl', ['common', 'login'])),
  },
})

const LoginPage = () => {
  const handleSubmit = (data: LoginDto) => {
    console.log({ data })
  }
  const { t } = useTranslation('login')

  return (
    <SecondaryLayout title={t('PAGE_TITLE')}>
      <LoginForm onSubmit={handleSubmit} />
    </SecondaryLayout>
  )
}

export default LoginPage
