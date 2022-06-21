import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { useLogout } from '../lib/auth'
import { withSessionSsr } from '../lib/session'
import { User } from '../types/auth'

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const { user } = req.session

  if (user === undefined) {
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return {
      props: {
        user: { id: 'test', email: 'asd' } as User,
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
  const { mutate: logout } = useLogout()

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
      <button onClick={logout} type="button">
        LOGOUT
      </button>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(countries, null, 2)}</pre>
    </>
  )
}

export default Home
