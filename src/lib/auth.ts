import axios from 'axios'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useAlertsState } from '../context/alerts/useAlertsState'
import { LoginDto, RegisterDto, UpdateUserDto, User } from '../types/auth'
import { ApiResponse, ApiError } from '../types/common'
import { api } from './api'

// Get user data
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

// Login
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
        router.push('/dashboard')
      }, 1000)
    },
    onError: (err: ApiError) => {
      setAlert({ msg: err.response.data.message, type: 'error' })
    },
  })
}

// Logout
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

// Register
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

// Confirm account
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

// Update account
export async function updateUser(updateUserDto: UpdateUserDto) {
  const { data } = await api.patch<ApiResponse<User>>(
    '/auth/update-account',
    updateUserDto,
  )
  return data
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { setAlert } = useAlertsState()

  return useMutation((values: UpdateUserDto) => updateUser(values), {
    onSuccess: data => {
      setAlert({ msg: data.message, type: 'success' })
      queryClient.invalidateQueries(['user'])
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}
