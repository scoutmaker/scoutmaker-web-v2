import { useEffect, useState } from 'react'

import { api } from '@/lib/api'
import { withSessionSsr } from '@/lib/session'
import { User } from '@/types/auth'
import { redirectToLogin } from '@/utils/redirect-to-login'

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const { user } = req.session

  if (user === undefined) {
    redirectToLogin(res)
    return {
      props: {
        user: { id: 0, email: 'asd' } as User,
      },
    }
  }

  return {
    props: { user: req.session.user },
  }
})

interface IHomepageProps {
  user: any
}

const Home = ({ user }: IHomepageProps) => {
  const [countries, setCountries] = useState<any[]>([])

  useEffect(() => {
    async function getCountries() {
      const res = await api.get('/countries')
      setCountries(res.data.data)
    }

    getCountries()
  }, [])

  return (
    <>
      <h1>Hello</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </>
  )
}

export default Home
