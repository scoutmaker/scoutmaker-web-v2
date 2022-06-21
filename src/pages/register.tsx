import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { SecondaryLayout } from '../layout/secondary-layout'
import { useRegister } from '../lib/auth'
import { Loader } from '../components/loader/loader'
import { RegisterForm } from '../components/auth-forms/register'

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

  const { mutate: register, isLoading } = useRegister()

  return (
    <SecondaryLayout title={t('PAGE_TITLE')}>
      {isLoading ? <Loader /> : null}
      <RegisterForm onSubmit={register} />
    </SecondaryLayout>
  )
}

export default RegisterPage
