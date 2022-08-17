import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import { CreateOrderDto } from '../types'

export const initialValues: CreateOrderDto = {
  description: '',
  matchId: 0,
  playerId: 0,
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      description: yup.string().required(t('orders:NO_DESCRIPTION_ERROR')),
      matchId: validateId({
        required: true,
        message: t('orders:NO_MATCH_ERROR'),
      }),
      playerId: validateId({
        required: true,
        message: t('orders:NO_PLAYER_ERROR'),
      }),
    })
    .defined()
}
