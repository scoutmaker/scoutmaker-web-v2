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
  homeTeamId: '',
  awayTeamId: '',
  competitionId: '',
  groupId: '',
  seasonId: '',
  date: formatDate(),
  homeGoals: 0,
  awayGoals: 0,
  videoUrl: '',
  transfermarktUrl: '',
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
        message: t('players:NO_SEASON_ERROR'),
      }),
      homeGoals: yup.number().min(0).max(20),
      awayGoals: yup.number().min(0).max(20),
      videoUrl: yup.string().url().notRequired(),
      transfermarktUrl: yup.string().url().notRequired(),
      date: yup
        .date()
        .test('maxDate', t('matches:DATE_FUTURE_ERROR'), value => {
          if (!value) return true
          const maxDate = new Date()
          maxDate.setDate(maxDate.getDate() + 7)

          return value <= maxDate
        })
        .required(t('matches:NO_DATE_ERROR')),
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
    groupId: group?.id || '',
    date: formatDate(date),
    seasonId: season.id,
    awayGoals: awayGoals || 0,
    homeGoals: homeGoals || 0,
  }
}
