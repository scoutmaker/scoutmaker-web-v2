import { Typography } from '@mui/material'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Loader } from '@/components/loader/loader'
import { RegisterForm } from '@/modules/auth/forms/register'
import { useRegister } from '@/modules/auth/hooks'

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
