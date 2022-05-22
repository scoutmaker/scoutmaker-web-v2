import * as yup from 'yup'
import { LoginDto } from '../../types/auth'

export const validationSchema: yup.SchemaOf<LoginDto> = yup
  .object({
    email: yup
      .string()
      .email('Niepoprawny adres e-mail')
      .required('Podaj adres e-mail'),
    password: yup.string().required('Podaj hasło'),
  })
  .defined()
