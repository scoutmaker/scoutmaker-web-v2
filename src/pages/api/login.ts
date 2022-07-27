import { NextApiRequest, NextApiResponse } from 'next'

import { withSessionRoute } from '@/lib/session'
import { client, setAuthToken } from '@/services/api/api'
import { ApiError } from '@/types/common'

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await client.post('auth/login', req.body)
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
