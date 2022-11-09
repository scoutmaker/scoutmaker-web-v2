import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateOrganizationPlayerAclDto,
  OrganizationPlayerAclDto,
  UpdateOrganizationPlayerAclDto,
} from '../types'

export const initialValues: CreateOrganizationPlayerAclDto = {
  organizationId: '',
  playerId: '',
  permissionLevel: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      organizationId: validateId({
        required: true,
        message: t('organization-player-acl:NO_ORGANIZATION_ERROR'),
      }),
      playerId: validateId({
        required: true,
        message: t('organization-player-acl:NO_PLAYER_ERROR'),
      }),
      permissionLevel: yup.string().notRequired(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    permissionLevel: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  acl: OrganizationPlayerAclDto,
): UpdateOrganizationPlayerAclDto {
  const { permissionLevel } = acl

  const values = {
    permissionLevel,
  }

  return map(values, value => value || '')
}
