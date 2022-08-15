import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { SeasonDto, UpdateSeasonDto } from '@/modules/seasons/types'
import { formatDate } from '@/utils/format-date'
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
      description: yup.string().required(t('orders:NO_DESCRIPTION_ERROR')), // ADD_TRANS
      matchId: validateId({
        required: true,
        message: t('orders:NO_MATCH_ERROR'),
      }), // ADD_TRANS
      playerId: validateId({
        required: true,
        message: t('orders:NO_PLAYER_ERROR'),
      }), // ADD_TRANS
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    startDate: yup.date().notRequired(),
    endDate: yup.date().notRequired(),
  })
}

export function getInitialStateFromCurrent(season: SeasonDto): UpdateSeasonDto {
  const { name, endDate, startDate } = season

  const values = {
    name,
  }

  const mapped = map(values, value => value || '')

  return {
    endDate: formatDate(endDate),
    startDate: formatDate(startDate),
    ...mapped,
  }
}
