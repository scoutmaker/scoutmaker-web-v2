import { TFunction } from 'next-i18next'
import * as yup from 'yup'

export function generatePasswordValidationSchema(t: TFunction) {
  return yup
    .string()
    .min(6, 'Hasło musi składać się co najmniej z 6 znaków')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      'Hasło musi zawierać co najmniej jedną małą literę, wielką literę oraz cyfrę',
    )
    .required('Podaj hasło')
}
