import { TFunction } from 'next-i18next'
import * as yup from 'yup'
import { LoginDto } from '../../types/auth'
import { generatePasswordValidationSchema } from '../../utils/common-validation-schemas'

export function generateLoginFormValidationSchema(
  t: TFunction,
): yup.SchemaOf<LoginDto> {
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

export const loginFormInitialValues: LoginDto = {
  email: '',
  password: '',
}

export function generateRegisterFormValidationSchema(t: TFunction) {
  return yup
    .object({
      firstName: yup.string().required('Podaj imię'),
      lastName: yup.string().required('Podaj nazwisko'),
      email: yup.string().email().required('Podaj adres e-mail'),
      password: generatePasswordValidationSchema(t),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], 'Podane hasła muszą być takie same')
        .required('Potwierdź hasło'),
    })
    .defined()
}

export const registerFormInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
}
