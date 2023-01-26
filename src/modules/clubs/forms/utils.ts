import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { ClubDto, CreateClubDto, UpdateClubDto } from '@/modules/clubs/types'
import { validateId } from '@/utils/validation-helpers'

export const initialValues: CreateClubDto = {
  name: '',
  countryId: '',
  regionId: '',
  city: '',
  postalCode: '',
  street: '',
  website: '',
  twitter: '',
  facebook: '',
  instagram: '',
}

function generateCommonClubFieldsValidationSchema() {
  return {
    city: yup.string().notRequired(),
    postalCode: yup.string().notRequired(),
    street: yup.string().notRequired(),
    website: yup.string().url().notRequired(),
    twitter: yup.string().url().notRequired(),
    facebook: yup.string().url().notRequired(),
    instagram: yup.string().url().notRequired(),
  }
}

export function generateCreateClubValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('clubs:NO_NAME_ERROR')),
      regionId: validateId(),
      countryId: validateId({
        message: t('clubs:NO_COUNTRY_ERROR'),
        required: true,
      }),
      ...generateCommonClubFieldsValidationSchema(),
    })
    .defined()
}

export function generateUpdateClubValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    regionId: validateId(),
    countryId: validateId(),
    ...generateCommonClubFieldsValidationSchema(),
  })
}

export function getInitialStateFromCurrent(club: ClubDto): UpdateClubDto {
  const { id, country, region, slug, ...rest } = club

  const mappedRest = map({ ...rest }, value => value || '')

  return {
    ...mappedRest,
    regionId: region?.id || '',
    countryId: country.id,
  }
}
