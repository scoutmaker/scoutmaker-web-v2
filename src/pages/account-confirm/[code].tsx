import { Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'

import { StyledLink } from '@/components/forms/styles'
import { Loader } from '@/components/loader/loader'
import { useConfirmAccount } from '@/modules/auth/hooks'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'pl', ['common'])

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

  useEffect(() => {
    confirmAccount(code as string)
  }, [])

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Typography component="h1" variant="h5" align="center">
        {t('WELCOME')}
      </Typography>
      <p>{t('ACCOUNT_CONFIRM')}</p>
      <StyledLink href="/login">{t('LOGIN')}</StyledLink>
    </>
  )
}

export default AccountConfirmPage
