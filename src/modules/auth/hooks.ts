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
} from '@/modules/auth/auth'
import {
  confirmAccount,
  forgotPassword,
  getUserData,
  login,
  logout,
  register,
  resetPassword,
  updatePassword,
  updateUser,
} from '@/services/api/methods/auth'
import { ApiError } from '@/services/api/types'

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

export function useLogout() {
  const router = useRouter()

  return useMutation(logout, {
    onSuccess: () => {
      router.push('/login')
      localStorage.removeItem('token')
    },
  })
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
