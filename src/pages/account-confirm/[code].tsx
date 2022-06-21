import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { SecondaryLayout } from '../../layout/secondary-layout'
import { StyledLink } from '../../components/auth-forms/styles'
import { useConfirmAccount } from '../../lib/auth'
import { Loader } from '../../components/loader/loader'

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
    <SecondaryLayout title={t('WELCOME')}>
      {isLoading ? <Loader /> : null}
      <p>{t('ACCOUNT_CONFIRM')}</p>
      <StyledLink href="/login">{t('LOGIN')}</StyledLink>
    </SecondaryLayout>
  )
}

export default AccountConfirmPage
