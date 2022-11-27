import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { formatDate } from '@/utils/format-date'
import { validateId } from '@/utils/validation-helpers'

import {
  CreateTeamAffiliationDto,
  TeamAffiliationDto,
  UpdateTeamAffiliationDto,
} from '../types'

export const initialValues: CreateTeamAffiliationDto = {
  playerId: '',
  teamId: '',
  startDate: formatDate(),
  endDate: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      playerId: validateId({
        required: true,
        message: t('team-affiliations:NO_PLAYER_ERROR'),
      }),
      teamId: validateId({
        required: true,
        message: t('team-affiliations:NO_TEAM_ERROR'),
      }),
      startDate: yup
        .date()
        .required(t('team-affiliations:NO_START_DATE_ERROR')),
      endDate: yup.date().notRequired(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    playerId: validateId(),
    teamId: validateId(),
    startDate: yup.date().notRequired(),
    endDate: yup.date().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  affiliation: TeamAffiliationDto,
): UpdateTeamAffiliationDto {
  const { player, startDate, team, endDate } = affiliation

  const values = {
    playerId: player.id,
    teamId: team.id,
  }

  const mapped = map(values, value => value || '')

  return {
    endDate: endDate ? formatDate(endDate) : '',
    startDate: formatDate(startDate),
    ...mapped,
  }
}
