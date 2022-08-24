import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CompetitionTypeDto,
  CreateCompetitionTypeDto,
  UpdateCompetitionTypeDto,
} from '../types'

export const initialValues: CreateCompetitionTypeDto = {
  name: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('competition-types:NO_NAME_ERROR')),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  country: CompetitionTypeDto,
): UpdateCompetitionTypeDto {
  const { name } = country

  const values = {
    name,
  }

  return map(values, value => value || '')
}
