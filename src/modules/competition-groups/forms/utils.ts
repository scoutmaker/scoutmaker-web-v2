import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CompetitionGroupDto,
  CreateCompetitionGroupDto,
  UpdateCompetitionGroupDto,
} from '../types'

export const initialValues: CreateCompetitionGroupDto = {
  name: '',
  competitionId: '',
  regionIds: [],
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('comp-groups:NO_NAME_ERROR')),
      competitionId: yup
        .string()
        .required(t('comp-groups:NO_COMPETITION_ERROR')),
      regionIds: yup.array().of(yup.string()).min(1).required(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    competitionId: yup.string().notRequired(),
    regionIds: yup.array().of(yup.string()).notRequired(),
  })
}

export function getInitialStateFromCurrent(
  group: CompetitionGroupDto,
): UpdateCompetitionGroupDto {
  const { name, competition, regions } = group

  const values = {
    name,
    competitionId: competition.id,
    regionIds: regions?.map(r => r.id) || [],
  }

  return map(values, value => value || '')
}
