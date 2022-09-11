import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CompetitionParticipationDto,
  CreateCompetitionParticipationDto,
  UpdateCompetitionParticipationDto,
} from '../types'

export const initialValues: CreateCompetitionParticipationDto = {
  competitionId: '',
  seasonId: '',
  teamId: '',
  groupId: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      competitionId: yup
        .string()
        .required(t('comp-participations:NO_COMPETITION_ERROR')),
      seasonId: yup.string().required(t('comp-participations:NO_SEASON_ERROR')),
      teamId: yup.string().required(t('comp-participations:NO_TEAM_ERROR')),
      groupId: yup.string().notRequired(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    competitionId: yup.string().notRequired(),
    seasonId: yup.string().notRequired(),
    teamId: yup.string().notRequired(),
    groupId: yup.string().notRequired(),
  })
}

export function generateCopyValidationSchema(t: TFunction) {
  return yup.object({
    fromSeasonId: validateId({
      required: true,
      message: t('comp-participations:NO_COPY_FROM_ERROR'),
    }),
    toSeasonId: validateId({
      required: true,
      message: t('comp-participations:NO_COPY_TO_ERROR'),
    }),
  })
}

export function getInitialStateFromCurrent(
  comp: CompetitionParticipationDto,
): UpdateCompetitionParticipationDto {
  const { competition, group, season, team } = comp

  const values = {
    competitionId: competition?.id,
    groupId: group?.id,
    seasonId: season?.id,
    teamId: team?.id,
  }

  return map(values, value => value || '')
}
