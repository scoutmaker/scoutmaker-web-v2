import axios from 'axios'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { useAlertsState } from '@/context/alerts/useAlertsState'
import {
  ForgotPasswordDto,
  LoginDto,
  PasswordResetDto,
  RegisterDto,
  UpdatePasswordDto,
  UpdateUserDto,
  User,
} from '@/types/auth'
import { ApiError, ApiResponse } from '@/types/common'

import { client } from '../services/api/api'

// Get user data
export async function getUserData() {
  const { data } = await client.get<ApiResponse<User>>('/auth/account')
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
  const { data } = await client.post<ApiResponse<User>>(
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
  const { data } = await client.get<ApiResponse<User>>(`/auth/verify/${code}`)
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
  const { data } = await client.patch<ApiResponse<User>>(
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

// Update password
export async function updatePassword(updatePasswordDto: UpdatePasswordDto) {
  const { data } = await client.patch<ApiResponse<User>>(
    '/auth/update-password',
    updatePasswordDto,
  )
  return data
}

export function useUpdatePassword() {
  const { setAlert } = useAlertsState()

  return useMutation((values: UpdatePasswordDto) => updatePassword(values), {
    onSuccess: data => {
      setAlert({ msg: data.message, type: 'success' })
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Forgot password
export async function forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
  const { data } = await client.post<ApiResponse<User>>(
    '/auth/forgot-password',
    forgotPasswordDto,
  )
  return data
}

export function useForgotPassword() {
  const { setAlert } = useAlertsState()

  return useMutation((values: ForgotPasswordDto) => forgotPassword(values), {
    onSuccess: data => {
      setAlert({ msg: data.message, type: 'success' })
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: err.response.data.message,
        type: 'error',
      }),
  })
}

// Reset password
export async function resetPassword(
  token: string,
  passwordResetDto: PasswordResetDto,
) {
  const { data } = await client.patch<ApiResponse<User>>(
    `/auth/password-reset/${token}`,
    passwordResetDto,
  )
  return data
}

export function useResetPassword(token: string) {
  const { setAlert } = useAlertsState()

  return useMutation(
    (values: PasswordResetDto) => resetPassword(token, values),
    {
      onSuccess: data => {
        setAlert({ msg: data.message, type: 'success' })
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: err.response.data.message,
          type: 'error',
        }),
    },
  )
}
