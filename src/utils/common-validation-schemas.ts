import { TFunction } from 'next-i18next'
import * as yup from 'yup'

export function generatePasswordValidationSchema(t: TFunction) {
  return yup
    .string()
    .min(6, t('PASSWORD_TOO_SHORT_ERROR'))
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, t('PASSWORD_REGEX_ERROR'))
    .required(t('NO_PASSWORD_ERROR'))
}
