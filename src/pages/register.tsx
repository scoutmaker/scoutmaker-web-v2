import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { SecondaryLayout } from '../layout/secondary-layout'
import { LoginForm } from '../components/auth-forms/login-form'
import { useLogin } from '../lib/auth'
import { Loader } from '../components/loader/loader'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'pl', [
    'common',
    'register',
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const RegisterPage = () => {
  const { t } = useTranslation('register')

  const { mutate: login, isLoading } = useLogin()

  return (
    <SecondaryLayout title={t('PAGE_TITLE')}>
      {isLoading ? <Loader /> : null}
      <LoginForm onSubmit={login} />
    </SecondaryLayout>
  )
}

export default RegisterPage
