import { Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ForgotPasswordForm } from '@/components/forms/forgot-password'
import { Loader } from '@/components/loader/loader'
import { useForgotPassword } from '@/modules/auth/hooks'

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

  const { mutate: forgotPassword, isLoading } = useForgotPassword()

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Typography component="h1" variant="h5" align="center">
        {t('password-reset:FORGOT_PASSWORD_PAGE_TITLE')}
      </Typography>
      <ForgotPasswordForm onSubmit={forgotPassword} />
    </>
  )
}

export default LoginPage
