import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreatePlayerGradeDto,
  PlayerGradeDto,
  UpdatePlayerGradeDto,
} from '../types'

export const initialValues: CreatePlayerGradeDto = {
  competitionId: '',
  grade: '' as CreatePlayerGradeDto['grade'],
  playerId: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      competitionId: validateId({
        required: true,
        message: t('player-grades:NO_COMPETITION_ERROR'),
      }),
      playerId: validateId({
        required: true,
        message: t('player-grades:NO_PLAYER_ERROR'),
      }),
      grade: validateId({
        required: true,
        message: t('player-grades:NO_GRADE_ERROR'),
      }),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    competitionId: yup.string().notRequired(),
    playerId: yup.string().notRequired(),
    grade: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  data: PlayerGradeDto,
): UpdatePlayerGradeDto {
  const { competition, grade, player } = data

  const values = {
    competitionId: competition.id,
    playerId: player.id,
    grade,
  }

  return map(values, value => value || '')
}
