import { ServerResponse } from 'http'

export function redirectToLogin(res: ServerResponse, redirectOnLogin?: string) {
  res.setHeader('location', `/login?redirectTo=${redirectOnLogin}`)
  res.statusCode = 302
  res.end()
}
