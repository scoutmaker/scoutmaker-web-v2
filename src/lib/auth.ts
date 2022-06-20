import axios from 'axios'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { LoginDto, User } from '../types/auth'
import { ApiResponse, ApiError } from '../types/common'

export async function login(loginDto: LoginDto) {
  const { data } = await axios.post<ApiResponse<{ user: User; token: string }>>(
    '/api/login',
    loginDto,
  )
  //     localStorage.setItem('token', res.data.token)
  //     setTimeout(() => {
  //       router.push('/')
  //     }, 1000)
  return data
}

export function useLogin() {
  const router = useRouter()

  return useMutation((values: LoginDto) => login(values), {
    onSuccess: data => {
      console.log({ data })
      localStorage.setItem('token', data.data.token)
      router.push('/')
      // set alert
      alert('Login successful')
    },
    onError: (err: ApiError) => {
      alert(err.response.data.message)
    },
  })
}
