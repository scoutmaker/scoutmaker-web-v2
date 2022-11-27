import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CompetitionJuniorLevelDto,
  CreateCompetitionJuniorLevelDto,
  UpdateCompetitionJuniorLevelDto,
} from '../types'

export const initialValues: CreateCompetitionJuniorLevelDto = {
  name: '',
  level: 1,
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('comp-junior-levels:NO_NAME_ERROR')),
      level: yup
        .number()
        .min(1)
        .max(15)
        .required(t('comp-junior-levels:NO_LEVEL_ERROR')),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    level: yup.number().min(1).max(15).notRequired(),
  })
}

export function getInitialStateFromCurrent(
  comp: CompetitionJuniorLevelDto,
): UpdateCompetitionJuniorLevelDto {
  const { name, level } = comp

  const values = {
    name,
    level,
  }

  return map(values, value => value || '')
}
