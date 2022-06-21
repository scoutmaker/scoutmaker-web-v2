import axios from 'axios'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useAlertsState } from '../context/alerts/useAlertsState'
import { LoginDto, User } from '../types/auth'
import { ApiResponse, ApiError } from '../types/common'

export async function login(loginDto: LoginDto) {
  const { data } = await axios.post<ApiResponse<{ user: User; token: string }>>(
    '/api/login',
    loginDto,
  )

  return data
}

export function useLogin() {
  const router = useRouter()
  const { setAlert } = useAlertsState()

  return useMutation((values: LoginDto) => login(values), {
    onSuccess: data => {
      localStorage.setItem('token', data.data.token)
      setAlert({ msg: data.message, type: 'success' })
      setTimeout(() => {
        router.push('/')
      }, 1000)
    },
    onError: (err: ApiError) => {
      setAlert({ msg: err.response.data.message, type: 'error' })
    },
  })
}
