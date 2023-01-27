import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import { CreateOrderDto } from '../types'

export const initialValues: CreateOrderDto = {
  description: '',
  matchId: '',
  playerId: '',
  executionDate: '',
  scoutId: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      description: yup.string().notRequired(),
      matchId: validateId(),
      playerId: validateId(),
      executionDate: yup.date().required(t('orders:NO_EXECUTION_DATE_ERROR')),
      scoutId: validateId().notRequired(),
    })
    .defined()
}
