import { NextApiRequest, NextApiResponse } from 'next'
import { ApiError } from '@/types/common'
import { api, setAuthToken } from '@/lib/api'
import { withSessionRoute } from '@/lib/session'

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await api.post('auth/login', req.body)
    setAuthToken(response.data.data.token)

    const { user, token } = response.data.data

    req.session.user = user
    req.session.token = token

    await req.session.save()
    res.send(response.data)
  } catch (error) {
    res
      .status((error as ApiError).response.status || 500)
      .json((error as ApiError).response.data)
  }
}

export default withSessionRoute(loginHandler)
