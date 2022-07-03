import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'
import { useLogin } from '../lib/auth'
import { Loader } from '../components/loader/loader'
import { ForgotPasswordForm } from '../components/forms/forgot-password'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'pl', [
    'common',
    'password-reset',
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const LoginPage = () => {
  const { t } = useTranslation(['common', 'password-reset'])

  const { mutate: login, isLoading } = useLogin()

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Typography component="h1" variant="h5" align="center">
        {t('password-reset:FORGOT_PASSWORD_PAGE_TITLE')}
      </Typography>
      <ForgotPasswordForm onSubmit={data => console.log(data)} />
    </>
  )
}

export default LoginPage
