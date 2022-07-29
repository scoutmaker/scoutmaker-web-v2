import axios from 'axios'

import {
  ForgotPasswordDto,
  LoginDto,
  PasswordResetDto,
  RegisterDto,
  UpdatePasswordDto,
  UpdateUserDto,
  User,
} from '@/modules/auth/auth'
import { ApiResponse } from '@/types/common'

import { client } from '../api'

export async function getUserData() {
  const { data } = await client.get<ApiResponse<User>>('/auth/account')
  return data.data
}

export async function login(loginDto: LoginDto) {
  const { data } = await axios.post<ApiResponse<{ user: User; token: string }>>(
    '/api/login',
    loginDto,
  )

  return data
}

export async function logout() {
  return axios.post('/api/logout')
}

export async function register(registerDto: RegisterDto) {
  const { data } = await client.post<ApiResponse<User>>(
    '/auth/register',
    registerDto,
  )

  return data
}

export async function confirmAccount(code: string) {
  const { data } = await client.get<ApiResponse<User>>(`/auth/verify/${code}`)
  return data
}

export async function updateUser(updateUserDto: UpdateUserDto) {
  const { data } = await client.patch<ApiResponse<User>>(
    '/auth/update-account',
    updateUserDto,
  )
  return data
}

export async function updatePassword(updatePasswordDto: UpdatePasswordDto) {
  const { data } = await client.patch<ApiResponse<User>>(
    '/auth/update-password',
    updatePasswordDto,
  )
  return data
}

export async function forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
  const { data } = await client.post<ApiResponse<User>>(
    '/auth/forgot-password',
    forgotPasswordDto,
  )
  return data
}

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
