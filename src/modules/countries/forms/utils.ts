import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'
import { CountryDto, CreateCountryDto, UpdateCountryDto } from '../types'

export const initialValues: CreateCountryDto = {
  name: '',
  code: '',
  isEuMember: false
}

export function generateCreateCountryValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('countries:NO_NAME_ERROR')),
      code: yup.string().required(t('countries:NO_CODE_ERROR')),
      isEuMember: yup.boolean().notRequired(),
    })
    .defined()
}

export function generateUpdateCountryValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    code: yup.string().notRequired(),
    isEuMember: yup.boolean().notRequired(),
  })
}

export function getInitialStateFromCurrent(country: CountryDto): UpdateCountryDto {
  const { name, code, isEuMember } = country

  const values = {
    name,
    code,
    isEuMember
  }

  return map(values, value => value || '')
}
