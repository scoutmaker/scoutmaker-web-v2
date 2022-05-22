import { ReactNode, useReducer } from 'react'
import * as React from 'react'
import { api } from '../../lib/api'
import AuthContext from './authContext'
import authReducer from './authReducer'
import { State } from './types'
import {
  LoginDto,
  RegisterDto,
  UpdatePasswordDto,
  UpdateUserDto,
  User,
} from '../../types/auth'
// import { useAlertsState } from '../alerts/useAlertsState'
import { ApiError } from '../../types/common'
// import { getErrorMessage } from '../../hooks/utils'

interface IAuthStateProps {
  children: ReactNode
}

export const AuthState = ({ children }: IAuthStateProps) => {
  // const { setAlert } = useAlertsState()
  let localStorageUser
  let localStorageExpiresAt

  if (typeof window !== 'undefined') {
    localStorageUser = localStorage.getItem('user')
    localStorageExpiresAt = localStorage.getItem('expiresAt')
  }

  const initialState: State = {
    user: localStorageUser ? (JSON.parse(localStorageUser) as User) : null,
    expiresAt: localStorageExpiresAt
      ? parseInt(localStorageExpiresAt, 10)
      : null,
    loading: false,
    error: null,
    message: null,
    setLoading: () => null,
    register: () => null,
    confirmAccount: () => null,
    login: () => null,
    logout: () => null,
    editDetails: () => null,
    updatePassword: () => null,
    isAuthenticated: () => false,
  }
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    })
  }

  // Register user
  const register = async (dto: RegisterDto) => {
    setLoading()

    try {
      const res = await api.post('/api/v1/auth/register', dto)
      // setAlert({
      //   msg: 'Rejestracja przebiegła pomyślnie. Na Twój adres email wysłaliśmy link weryfikacyjny',
      //   type: 'success',
      // })

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { message: res.data.message },
      })
    } catch (err) {
      // setAlert({
      //   msg: getErrorMessage((err as ApiError).response.data.error),
      //   type: 'error',
      // })

      dispatch({
        type: 'AUTH_ERROR',
        payload: (err as ApiError).response.data.error,
      })
    }
  }

  // Confirm account
  const confirmAccount = async (confirmationCode: string) => {
    try {
      const res = await api.get(`/api/v1/auth/confirm/${confirmationCode}`)
      // setAlert({
      //   msg: 'Weryfikacja przebiegła pomyślnie, możesz się zalogować na swoje konto.',
      //   type: 'success',
      // })

      dispatch({
        type: 'CONFIRMATION_SUCCESS',
        payload: { message: res.data.message },
      })
    } catch (err) {
      // setAlert({
      //   msg: getErrorMessage((err as ApiError).response.data.error),
      //   type: 'error',
      // })

      dispatch({
        type: 'AUTH_ERROR',
        payload: (err as ApiError).response.data.error,
      })
    }
  }

  // Login user
  const login = async (dto: LoginDto) => {
    setLoading()

    try {
      const res = await api.post('/api/v1/auth/login', dto)
      // setAlert({ msg: 'Zalogowano pomyślnie!', type: 'success' })

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          message: res.data.message,
          data: {
            user: res.data.data.user,
            expiresAt: res.data.data.expiresAt,
          },
        },
      })
    } catch (err) {
      // setAlert({
      //   msg: getErrorMessage((err as ApiError).response.data.error),
      //   type: 'error',
      // })

      dispatch({
        type: 'AUTH_ERROR',
        payload: (err as ApiError).response.data.error,
      })
    }
  }

  // Update password
  const updatePassword = async (dto: UpdatePasswordDto) => {
    setLoading()

    try {
      const res = await api.put('/api/v1/auth/updatepassword', dto)
      // setAlert({ msg: 'Hasło zmienione pomyślnie!', type: 'success' })

      dispatch({
        type: 'UPDATE_PASSWORD_SUCCESS',
        payload: { expiresAt: res.data.expiresAt, message: res.data.message },
      })
    } catch (err) {
      // setAlert({
      //   msg: getErrorMessage((err as ApiError).response.data.error),
      //   type: 'error',
      // })

      dispatch({
        type: 'AUTH_ERROR',
        payload: (err as ApiError).response.data.error,
      })
    }
  }

  // Logout
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    })
  }

  // Edit details
  const editDetails = async (dto: UpdateUserDto) => {
    setLoading()

    try {
      const res = await api.put('/api/v1/auth/updatedetails', dto)
      // setAlert({
      //   msg: 'Dane konta zaktualizowane pomyślnie!',
      //   type: 'success',
      // })

      dispatch({
        type: 'EDIT_SUCCESS',
        payload: { user: res.data.data, message: res.data.message },
      })
    } catch (err) {
      // setAlert({
      //   msg: getErrorMessage((err as ApiError).response.data.error),
      //   type: 'error',
      // })

      dispatch({
        type: 'EDIT_ERROR',
        payload: (err as ApiError).response.data.error,
      })
    }
  }

  // Check if the user is authenticated
  const isAuthenticated = () => {
    if (!state.user || !state.expiresAt) {
      return false
    }
    return new Date().getTime() / 1000 < state.expiresAt
  }

  const { loading, error, message } = state

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user: state.user,
        expiresAt: state.expiresAt,
        loading,
        error,
        message,
        setLoading,
        login,
        logout,
        register,
        confirmAccount,
        editDetails,
        updatePassword,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
