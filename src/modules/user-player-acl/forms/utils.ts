import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateUserPlayerAceDto,
  UpdateUserPlayerAceDto,
  UserPlayerAceDto,
} from '../types'

export const initialValues: CreateUserPlayerAceDto = {
  playerId: '',
  userId: '',
  permissionLevel: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      userId: validateId({
        required: true,
        message: t('user-player-acl:NO_USER_ERROR'),
      }),
      playerId: validateId({
        required: true,
        message: t('user-player-acl:NO_PLAYER_ERROR'),
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
  ace: UserPlayerAceDto,
): UpdateUserPlayerAceDto {
  const { permissionLevel, player, user } = ace

  const values = {
    permissionLevel,
    playerId: player.id,
    userId: user.id,
  }

  return map(values, value => value || '')
}
