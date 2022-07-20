import { Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { LoginForm } from '@/components/forms/login'
import { Loader } from '@/components/loader/loader'
import { useLogin } from '@/lib/auth'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'pl', [
    'common',
    'login',
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const LoginPage = () => {
  const { t } = useTranslation('login')

  const { mutate: login, isLoading } = useLogin()

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Typography component="h1" variant="h5" align="center">
        {t('PAGE_TITLE')}
      </Typography>
      <LoginForm onSubmit={login} />
    </>
  )
}

export default LoginPage
