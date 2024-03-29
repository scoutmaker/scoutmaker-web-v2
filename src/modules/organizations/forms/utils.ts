import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateIdsArray } from '@/utils/validation-helpers'

import {
  CreateOrganizationDto,
  OrganizationDto,
  UpdateOrganizationDto,
} from '../types'

export const initialValues: CreateOrganizationDto = {
  memberIds: [],
  name: '',
  logoUrl: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('organizations:NO_NAME_ERROR')),
      memberIds: validateIdsArray().min(1),
      logoUrl: yup.string().notRequired(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    logoUrl: yup.string().notRequired(),
  })
}

export function generateAddMembersValidationSchema() {
  return yup.object({
    memberIds: validateIdsArray(),
  })
}

export function getInitialStateFromCurrent(
  organization: OrganizationDto,
): UpdateOrganizationDto {
  const { name, logoUrl } = organization

  const values = {
    name,
    logoUrl,
  }

  return map(values, value => value || '')
}
