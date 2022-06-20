import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SecondaryLayout } from '../layout/secondary-layout'
import { LoginForm } from '../components/login-form/login-form'
import { LoginDto } from '../types/auth'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'pl', ['common', 'login'])),
  },
})

const LoginPage = () => {
  const { t } = useTranslation('login')

  const router = useRouter()

  async function login(data: LoginDto) {
    try {
      const res = await axios.post('/api/login', data)
      localStorage.setItem('token', res.data.token)
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } catch (error) {
      console.error({ error })
    }
  }

  return (
    <SecondaryLayout title={t('PAGE_TITLE')}>
      {/* {loading ? <Loader /> : null} */}
      <LoginForm onSubmit={login} />
    </SecondaryLayout>
  )
}

export default LoginPage
