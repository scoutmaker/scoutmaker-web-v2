import {
  LoginDto,
  RegisterDto,
  UpdatePasswordDto,
  UpdateUserDto,
  User,
} from '../../types/auth'

export type State = {
  user: User | null
  expiresAt: number | null
  loading: boolean
  error: string | null
  message: string | null
  setLoading: () => void
  register: (dto: RegisterDto) => void
  confirmAccount: (confirmationCode: string) => void
  login: (dto: LoginDto) => void
  logout: () => void
  editDetails: (dto: UpdateUserDto) => void
  updatePassword: (dto: UpdatePasswordDto) => void
  isAuthenticated: () => boolean
}

export type Action =
  | { type: 'REGISTER_SUCCESS'; payload: { message: string } }
  | { type: 'CONFIRMATION_SUCCESS'; payload: { message: string } }
  | { type: 'AUTH_ERROR'; payload: string }
  | {
      type: 'LOGIN_SUCCESS'
      payload: {
        message: string
        data: { user: User; expiresAt: number }
      }
    }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING' }
  | {
      type: 'EDIT_SUCCESS'
      payload: { user: User; message: string }
    }
  | { type: 'EDIT_ERROR'; payload: string }
  | {
      type: 'UPDATE_PASSWORD_SUCCESS'
      payload: { expiresAt: number; message: string }
    }
