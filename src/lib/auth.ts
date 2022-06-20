import axios from 'axios'
import { LoginDto } from '../types/auth'

export async function login(data: LoginDto) {
  try {
    const res = await axios.post('/api/login', data)
    localStorage.setItem('token', res.data.token)
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (error) {
    console.error({ error })
  }
}
