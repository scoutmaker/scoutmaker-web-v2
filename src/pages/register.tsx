import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'
import { useRegister } from '@/lib/auth'
import { Loader } from '@/components/loader/loader'
import { RegisterForm } from '@/components/forms/register'

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
    <>
      {isLoading ? <Loader /> : null}
      <Typography component="h1" variant="h5" align="center">
        {t('PAGE_TITLE')}
      </Typography>
      <RegisterForm onSubmit={register} />
    </>
  )
}

export default RegisterPage
