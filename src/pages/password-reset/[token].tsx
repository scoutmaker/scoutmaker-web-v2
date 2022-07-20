import { Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ResetPasswordForm } from '@/components/forms/reset-password'
import { Loader } from '@/components/loader/loader'
import { useResetPassword } from '@/lib/auth'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
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

const AccountConfirmPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { token } = router.query

  const { mutate: resetPassword, isLoading } = useResetPassword(token as string)

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Typography component="h1" variant="h5" align="center">
        {t('password-reset:PASSWORD_RESET_PAGE_TITLE')}
      </Typography>
      <ResetPasswordForm onSubmit={resetPassword} />
    </>
  )
}

export default AccountConfirmPage
