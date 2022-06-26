import axios from 'axios'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { useAlertsState } from '../context/alerts/useAlertsState'
import { LoginDto, RegisterDto, User } from '../types/auth'
import { ApiResponse, ApiError } from '../types/common'
import { api } from './api'

export async function getUserData() {
  const { data } = await api.get<ApiResponse<User>>('/auth/account')
  return data.data
}

export function useUser() {
  const { setAlert } = useAlertsState()

  return useQuery(['user'], getUserData, {
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

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

export async function logout() {
  return axios.post('/api/logout')
}

export function useLogout() {
  const router = useRouter()

  return useMutation(logout, {
    onSuccess: () => {
      router.push('/login')
      localStorage.removeItem('token')
    },
  })
}

export async function register(registerDto: RegisterDto) {
  const { data } = await api.post<ApiResponse<User>>(
    '/auth/register',
    registerDto,
  )

  return data
}

export function useRegister() {
  const { setAlert } = useAlertsState()

  return useMutation((values: RegisterDto) => register(values), {
    onSuccess: data => {
      setAlert({ msg: data.message, type: 'success' })
    },
    onError: (err: ApiError) => {
      setAlert({ msg: err.response.data.message, type: 'error' })
    },
  })
}

export async function confirmAccount(code: string) {
  const { data } = await api.get<ApiResponse<User>>(`/auth/verify/${code}`)
  return data
}

export function useConfirmAccount() {
  const router = useRouter()
  const { setAlert } = useAlertsState()

  return useMutation((code: string) => confirmAccount(code), {
    onSuccess: data => {
      setAlert({ msg: data.message, type: 'success' })
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    },
    onError: (err: ApiError) => {
      setAlert({ msg: err.response.data.message, type: 'error' })
    },
  })
}
