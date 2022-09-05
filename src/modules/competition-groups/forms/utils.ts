import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId, validateIdsArray } from '@/utils/validation-helpers'

import {
  CompetitionGroupDto,
  CreateCompetitionGroupDto,
  UpdateCompetitionGroupDto,
} from '../types'

export const initialValues: CreateCompetitionGroupDto = {
  name: '',
  competitionId: 0,
  regionIds: [],
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('comp-groups:NO_NAME_ERROR')),
      competitionId: validateId({
        required: true,
        message: t('comp-groups:NO_COMPETITION_ERROR'),
      }),
      regionIds: validateIdsArray().min(1).required(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    competitionId: validateId(),
    regionIds: validateIdsArray().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  group: CompetitionGroupDto,
): UpdateCompetitionGroupDto {
  const { name, competition, regions } = group

  const values = {
    name,
    competitionId: competition.id,
    regionIds: regions.map(r => r.id),
  }

  return map(values, value => value || '')
}
