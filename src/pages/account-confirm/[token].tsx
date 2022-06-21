import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { SecondaryLayout } from '../../layout/secondary-layout'
import { StyledLink } from '../../components/auth-forms/styles'

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
  const { token } = router.query

  console.log({ token })

  return (
    <SecondaryLayout title={t('WELCOME')}>
      <p>{t('ACCOUNT_CONFIRM')}</p>
      <StyledLink href="/login">{t('LOGIN')}</StyledLink>
    </SecondaryLayout>
  )
}

export default AccountConfirmPage
