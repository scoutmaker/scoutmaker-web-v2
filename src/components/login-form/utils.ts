import { TFunction } from 'next-i18next'
import * as yup from 'yup'
import { LoginDto } from '../../types/auth'

export function generateValidationSchema(t: TFunction): yup.SchemaOf<LoginDto> {
  return yup
    .object({
      email: yup
        .string()
        .email(t('login:INVALID_EMAIL_ERROR'))
        .required(t('login:NO_EMAIL_ERROR')),
      password: yup.string().required(t('login:NO_PASSWORD_ERROR')),
    })
    .defined()
}

export const initialValues: LoginDto = {
  email: '',
  password: '',
}
