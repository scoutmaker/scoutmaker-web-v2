import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { CreateTeamDto } from '@/modules/teams/types'

import {
  CompetitionAgeCategortyDto,
  UpdateCompetitionAgeCategoryDto,
} from '../types'

export const initialValues: CreateTeamDto = {
  name: '',
  clubId: 0,
  competitionId: 0,
  groupId: 0,
  minut90url: '',
  transfermarktUrl: '',
  lnpId: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('teams:NO_NAME_ERROR')),
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
