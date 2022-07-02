import { ServerResponse } from 'http'

export function redirectToLogin(res: ServerResponse) {
  res.setHeader('location', '/login')
  res.statusCode = 302
  res.end()
}
