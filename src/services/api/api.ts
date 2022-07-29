import axios from 'axios'

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

client.interceptors.request.use(config => {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) {
    const modifiedConfig = { ...config }
    const token = localStorage.getItem('token')
    if (token && modifiedConfig.headers) {
      modifiedConfig.headers['x-auth-token'] = token
    }
    return modifiedConfig
  }
  return config
})

export function setAuthToken(token: string) {
  client.defaults.headers.common['x-auth-token'] = token
}
