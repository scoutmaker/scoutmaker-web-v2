import { TFunction } from 'next-i18next'
import * as yup from 'yup'
import { LoginDto } from '../../types/auth'

export function generatePasswordValidationSchema(t: TFunction) {
  return yup
    .string()
    .min(6, t('PASSWORD_TOO_SHORT_ERROR'))
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, t('PASSWORD_REGEX_ERROR'))
    .required(t('NO_PASSWORD_ERROR'))
}

export function generateLoginFormValidationSchema(
  t: TFunction,
): yup.SchemaOf<LoginDto> {
  return yup
    .object({
      email: yup
        .string()
        .email(t('INVALID_EMAIL_ERROR'))
        .required(t('NO_EMAIL_ERROR')),
      password: yup.string().required(t('NO_PASSWORD_ERROR')),
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
      firstName: yup.string().required(t('NO_FIRST_NAME_ERROR')),
      lastName: yup.string().required(t('NO_LAST_NAME_ERROR')),
      email: yup
        .string()
        .email(t('INVALID_EMAIL_ERROR'))
        .required(t('NO_EMAIL_ERROR')),
      password: generatePasswordValidationSchema(t),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], t('PASSWORDS_DO_NOT_MATCH_ERROR'))
        .required(t('NO_PASSWORD_CONFIRM_ERROR')),
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
