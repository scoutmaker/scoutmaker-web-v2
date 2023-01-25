import { Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Loader } from '@/components/loader/loader'
import { LoginForm } from '@/modules/auth/forms/login'
import { useLogin } from '@/modules/auth/hooks'

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

  const router = useRouter()
  const { mutate: login, isLoading } = useLogin(
    router.query.redirectTo as string,
  )

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
