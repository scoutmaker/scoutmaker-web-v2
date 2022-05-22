import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { useAuthState } from '../context/auth/useAuthState'

interface IAuthLayoutProps {
  children: ReactNode
}

export const AuthLayout = ({ children }: IAuthLayoutProps) => {
  const router = useRouter()
  console.log('hello')
  const { user, isAuthenticated } = useAuthState()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login')
    }
  }, [])

  if (!user) {
    return <h1>loading...</h1>
  }

  return <div>{children}</div>
}
