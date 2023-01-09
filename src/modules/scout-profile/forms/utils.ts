import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { formatDate } from '@/utils/format-date'
import { validateId } from '@/utils/validation-helpers'

import {
  CreateScouProfileDto,
  ScoutProfileDto,
  UpdateScouProfileDto,
} from '../types'

export const initialValues: CreateScouProfileDto = {
  userId: '',
  cooperationStartDate: formatDate(),
  description: '',
  rating: 1,
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      userId: validateId({
        required: true,
        message: t('scout-profiles:NO_USER_ERROR'),
      }),
      cooperationStartDate: yup.date().notRequired(),
      description: yup.string().notRequired(),
      rating: yup.number().notRequired(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    userId: validateId(),
    cooperationStartDate: yup.date().notRequired(),
    description: yup.string().notRequired(),
    rating: yup.number().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  profile: ScoutProfileDto,
): UpdateScouProfileDto {
  const { user, cooperationStartDate, description, rating } = profile

  const values = {
    userId: user.id,
    description,
    rating,
  }

  const mapped = map(values, value => value || '')

  return { ...mapped, cooperationStartDate: formatDate(cooperationStartDate) }
}
