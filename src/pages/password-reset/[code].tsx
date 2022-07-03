import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'
import { useConfirmAccount } from '../../lib/auth'
import { Loader } from '../../components/loader/loader'
import { ResetPasswordForm } from '../../components/forms/reset-password'

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
  const { code } = router.query

  const { mutate: confirmAccount, isLoading } = useConfirmAccount()

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Typography component="h1" variant="h5" align="center">
        {t('password-reset:PASSWORD_RESET_PAGE_TITLE')}
      </Typography>
      <ResetPasswordForm onSubmit={data => console.log(data)} />
    </>
  )
}

export default AccountConfirmPage
