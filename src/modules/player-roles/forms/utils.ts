import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreatePlayerRoleDto,
  PlayerRoleDto,
  UpdatePlayerRoleDto,
} from '../types'

export const initialValues: CreatePlayerRoleDto = {
  name: '',
  positionTypeId: '',
  altName: '',
  description: '',
  isPublished: false,
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('player-roles:NO_NAME_ERROR')),
      altName: yup.string().notRequired(),
      description: yup.string().notRequired(),
      positionTypeId: validateId({
        required: true,
        message: t('player-roles:NO_POSITION_ERROR'),
      }),
      isPublished: yup.boolean().notRequired(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    altName: yup.string().notRequired(),
    description: yup.string().notRequired(),
    positionTypeId: validateId(),
    isPublished: yup.boolean().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  role: PlayerRoleDto,
): UpdatePlayerRoleDto {
  const { positionType, altName, description, name } = role

  const values = {
    name,
    altName,
    description,
    positionTypeId: positionType.id,
  }

  return map(values, value => value || '')
}
