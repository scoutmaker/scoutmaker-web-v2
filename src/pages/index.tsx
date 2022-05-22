import type { GetStaticProps, NextPage } from 'next'
import { Test } from '../components/Test'
import { useAuthState } from '../context/auth/useAuthState'
import { AuthLayout } from '../layout/auth-layout'

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    isProtected: true,
  },
})

const Home: NextPage = () => {
  const { user } = useAuthState()

  console.log({ user })

  return (
    <AuthLayout>
      <h1>Hello</h1>
      <Test />
    </AuthLayout>
  )
}

export default Home
