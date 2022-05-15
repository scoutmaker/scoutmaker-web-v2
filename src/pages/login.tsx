import { AuthLayout } from '../layout/auth-layout'

const LoginPage = () => {
  console.log('hello from login page')

  return (
    <AuthLayout title="Logowanie">
      <div>Hello from Login Page</div>
    </AuthLayout>
  )
}

export default LoginPage
