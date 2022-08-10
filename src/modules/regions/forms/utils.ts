import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'
import { validateId } from '@/utils/validation-helpers'
import { CreateRegionDto, RegionDto, UpdateRegionDto } from '../types'

export const initialValues: CreateRegionDto = {
  name: '',
  countryId: 0
}

export function generateCreateRegionValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('regions:NO_NAME_ERROR')),
      countryId: validateId({ required: true, message: t('regions:NO_COUNTRY_ERROR') }),
    })
    .defined()
}

export function generateUpdateRegionValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    countryId: validateId(),
  })
}

export function getInitialStateFromCurrent(region: RegionDto): UpdateRegionDto {
  const { name, country } = region

  const values = {
    name,
    countryId: country.id
  }

  return map(values, value => value || '')
}
