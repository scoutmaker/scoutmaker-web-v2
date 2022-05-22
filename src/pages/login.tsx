import { LoginForm } from '../components/login-form'
import { SecondaryLayout } from '../layout/secondary-layout'
import { LoginDto } from '../types/auth'

const LoginPage = () => {
  const handleSubmit = (data: LoginDto) => {
    console.log({ data })
  }

  return (
    <SecondaryLayout title="Logowanie">
      <LoginForm onSubmit={handleSubmit} />
    </SecondaryLayout>
  )
}

export default LoginPage
