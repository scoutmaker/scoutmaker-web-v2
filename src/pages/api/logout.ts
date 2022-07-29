import { withIronSessionApiRoute } from 'iron-session/next'

import { sessionOptions } from '@/modules/auth/session'

export default withIronSessionApiRoute((req, res) => {
  req.session.destroy()
  res.send({ ok: true })
}, sessionOptions)
