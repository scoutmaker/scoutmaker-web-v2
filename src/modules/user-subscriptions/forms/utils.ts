import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { formatDate } from '@/utils/format-date'
import { validateId, validateIdsArray } from '@/utils/validation-helpers'

import {
  CreateUserSubscriptionDto,
  UpdateUserSubscriptionDto,
  UserSubscriptionDto,
} from '../types'

export const initialValues: CreateUserSubscriptionDto = {
  competitionGroupIds: [],
  competitionIds: [],
  endDate: formatDate(),
  startDate: formatDate(),
  userId: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      competitionGroupIds: validateIdsArray().notRequired(),
      competitionIds: validateIdsArray().min(1),
      endDate: yup.date().required(t('user-subs:NO_END_DATE_ERROR')),
      startDate: yup.date().required(t('user-subs:NO_START_DATE_ERROR')),
      userId: validateId({
        required: true,
        message: t('user-subs:NO_USER_ERROR'),
      }),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    competitionGroupIds: validateIdsArray().notRequired(),
    competitionIds: validateIdsArray().notRequired(),
    endDate: yup.date().notRequired(),
    startDate: yup.date().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  userSub: UserSubscriptionDto,
): UpdateUserSubscriptionDto {
  const { competitionGroups, competitions, endDate, startDate } = userSub

  const values = {
    competitionGroupIds: competitionGroups.map(gr => gr.id),
    competitionIds: competitions.map(comp => comp.id),
  }

  const mapped = map(values, value => value || '')

  return {
    endDate: formatDate(endDate),
    startDate: formatDate(startDate),
    ...mapped,
  }
}
