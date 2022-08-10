import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CompetitionDto,
  CreateCompetitonDto,
  UpdateCompetitionDto,
} from '../types'

export const initialValues: CreateCompetitonDto = {
  name: '',
  ageCategoryId: 0,
  countryId: 0,
  level: 0,
  typeId: 0,
  gender: 'MALE',
  juniorLevelId: 0,
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('competitions:NO_NAME_ERROR')), // ADD_TRANS
      ageCategoryId: validateId({
        required: true,
        message: t('competitions:NO_AGE_CATEGORY_ERROR'), // ADD_TRANS
      }),
      countryId: validateId({
        required: true,
        message: t('competitions:NO_COUNTRY_ERROR'), // ADD_TRANS
      }),
      level: yup.number().required(t('competitions:NO_LEVEL_ERROR')), // ADD_TRANS
      typeId: validateId({
        required: true,
        message: t('competitions:NO_TYPE_ERROR'), // ADD_TRANS
      }),
      gender: yup
        .string()
        .oneOf(['MALE', 'FEMALE'])
        .required(t('competitions:NO_GENDER_ERROR')), // ADD_TRANS
      juniorLevelId: validateId({
        required: true,
        message: t('competitions:NO_JUNIOR_LEVEL_ERROR'), // ADD_TRANS
      }),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    ageCategoryId: validateId(),
    countryId: validateId(),
    level: yup.number().notRequired(),
    typeId: validateId(),
    gender: yup.string().oneOf(['MALE', 'FEMALE']).notRequired(),
    juniorLevelId: validateId(),
  })
}

export function getInitialStateFromCurrent(
  comp: CompetitionDto,
): UpdateCompetitionDto {
  const { name, ageCategory, country, gender, level, type, juniorLevel } = comp

  const values = {
    name,
    ageCategoryId: ageCategory.id,
    countryId: country.id,
    gender,
    level,
    typeId: type.id,
    juniorLevelId: juniorLevel?.id,
  }

  return map(values, value => value || '')
}