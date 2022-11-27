import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import { CreateOrderDto } from '../types'

export const initialValues: CreateOrderDto = {
  description: '',
  matchId: '',
  playerId: '',
}

export function generateCreateValidationSchema() {
  return yup
    .object({
      description: yup.string().notRequired(),
      matchId: validateId(),
      playerId: validateId(),
    })
    .defined()
}
