import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CreatePlayerStatsDto,
  PlayerStatsDto,
  UpdatePlayerStatsDto,
} from '../types'

export const initialValues: CreatePlayerStatsDto = {
  matchId: '',
  playerId: '',
  assists: 0,
  goals: 0,
  minutesPlayed: 0,
  redCards: 0,
  teamId: '',
  yellowCards: 0,
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      playerId: yup.string().required(t('player-stats:NO_PLAYER_ERROR')),
      matchId: yup.string().required(t('player-stats:NO_MATCH_ERROR')),
      minutesPlayed: yup.number().min(0).max(120).notRequired(),
      goals: yup.number().min(0).notRequired(),
      assists: yup.number().min(0).notRequired(),
      yellowCards: yup.number().min(0).max(2).notRequired(),
      redCards: yup.number().min(0).max(1).notRequired(),
      teamId: yup.string().notRequired(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    playerId: yup.string().notRequired(),
    matchId: yup.string().notRequired(),
    minutesPlayed: yup.number().min(0).max(20).notRequired(),
    goals: yup.number().min(0).notRequired(),
    assists: yup.number().min(0).notRequired(),
    yellowCards: yup.number().min(0).max(2).notRequired(),
    redCards: yup.number().min(0).max(1).notRequired(),
    teamId: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  stats: PlayerStatsDto,
): UpdatePlayerStatsDto {
  const { id, player, match, ...rest } = stats

  const values = {
    playerId: player.id,
    matchId: match.id,
    ...rest,
  }

  return map(values, value => value || '')
}
