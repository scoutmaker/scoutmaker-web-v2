import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CompetitionAgeCategortyDto,
  CreateCompetitionAgeCategoryDto,
  UpdateCompetitionAgeCategoryDto,
} from '../types'

export const initialValues: CreateCompetitionAgeCategoryDto = {
  name: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('comp-age-categ:NO_NAME_ERROR')),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  compAgeCateg: CompetitionAgeCategortyDto,
): UpdateCompetitionAgeCategoryDto {
  const { name } = compAgeCateg

  const values = {
    name,
  }

  return map(values, value => value || '')
}
