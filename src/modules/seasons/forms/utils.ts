import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { formatDate } from '@/utils/format-date'

import { CreateSeasonDto, SeasonDto, UpdateSeasonDto } from '../types'

export const initialValues: CreateSeasonDto = {
  name: '',
  endDate: formatDate(),
  startDate: formatDate(),
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('seasons:NO_NAME_ERROR')),
      startDate: yup.date().required(t('seasons:NO_START_DATE_ERROR')),
      endDate: yup.date().required(t('seasons:NO_END_DATE_ERROR')),
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
