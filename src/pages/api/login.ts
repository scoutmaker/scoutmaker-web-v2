import { NextApiRequest, NextApiResponse } from 'next'
import { api, setAuthToken } from '../../lib/api'
import { withSessionRoute } from '../../lib/session'

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await api.post('auth/login', req.body)
    setAuthToken(response.data.data.token)

    const { user, token } = response.data.data

    req.session.user = user
    req.session.token = token

    await req.session.save()
    res.send({
      ok: true,
      user,
      token,
    })
  } catch (error) {
    console.error({ error })
  }
}

export default withSessionRoute(loginHandler)
