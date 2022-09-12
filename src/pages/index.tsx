import { useEffect, useState } from 'react'

import { User } from '@/modules/auth/auth'
import { withSessionSsr } from '@/modules/auth/session'
import { client } from '@/services/api/api'
import { redirectToLogin } from '@/utils/redirect-to-login'

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const { user } = req.session

  if (user === undefined) {
    redirectToLogin(res)
    return {
      props: {
        user: { id: '1', email: 'asd' } as User,
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
      const res = await client.get('/countries')
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
