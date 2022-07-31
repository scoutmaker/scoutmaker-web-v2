import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CreateMatchDto,
  MatchDto,
  UpdateMatchDto,
} from '@/modules/matches/types'
import { formatDate } from '@/utils/format-date'
import { validateId } from '@/utils/validation-helpers'

export const initialValues: CreateMatchDto = {
  homeTeamId: 0,
  awayTeamId: 0,
  competitionId: 0,
  groupId: 0,
  seasonId: 0,
  date: formatDate(),
  homeGoals: 0,
  awayGoals: 0,
  videoUrl: '',
}

export function generateMatchFormValidationSchema(t: TFunction) {
  return yup
    .object({
      homeTeamId: validateId({
        required: true,
        message: t('matches:NO_HOME_TEAM_ERROR'),
      }),
      awayTeamId: validateId({
        required: true,
        message: t('matches:NO_AWAY_TEAM_ERROR'),
      }),
      competitionId: validateId({
        required: true,
        message: t('matches:NO_COMPETITION_ERROR'),
      }),
      seasonId: validateId({
        required: true,
        message: t('players:NO_TEAM_ERROR'),
      }),
      homeGoals: yup.number().min(0).max(20),
      awayGoals: yup.number().min(0).max(20),
      videoUrl: yup.string().url().notRequired(),
    })
    .defined()
}

export function getInitialStateFromCurrent(match: MatchDto): UpdateMatchDto {
  const {
    id,
    _count: count,
    awayTeam,
    competition,
    date,
    homeTeam,
    season,
    awayGoals,
    homeGoals,
    group,
    ...rest
  } = match

  const mappedRest = map({ ...rest }, value => value || '')

  return {
    ...mappedRest,
    homeTeamId: homeTeam.id,
    awayTeamId: awayTeam.id,
    competitionId: competition.id,
    groupId: group?.id || 0,
    date: formatDate(date),
    seasonId: season.id,
    awayGoals: awayGoals || 0,
    homeGoals: homeGoals || 0,
  }
}
