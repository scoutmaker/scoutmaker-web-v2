import { TFunction } from 'next-i18next'
import * as yup from 'yup'
import map from 'just-map-values'
import { ClubDto, CreateClubDto, UpdateClubDto } from '../../../types/clubs'

export const initialValues: CreateClubDto = {
  name: '',
  countryId: '',
  regionId: '',
  lnpId: '',
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
    lnpId: yup.string().notRequired(),
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
      regionId: yup.string().required(t('clubs:NO_REGION_ERROR')),
      countryId: yup.string().required(t('clubs:NO_COUNTRY_ERROR')),
      ...generateCommonClubFieldsValidationSchema(),
    })
    .defined()
}

export function generateUpdateClubValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    regionId: yup.string().notRequired(),
    countryId: yup.string().notRequired(),
    ...generateCommonClubFieldsValidationSchema(),
  })
}

export function getInitialStateFromCurrent(club: ClubDto): UpdateClubDto {
  const { id, country, region, slug, ...rest } = club

  const values = {
    ...rest,
    regionId: region.id,
    countryId: country.id,
  }

  return map(values, value => value || '')
}
