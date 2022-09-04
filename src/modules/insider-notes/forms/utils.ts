import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateInsiderNoteDto,
  InsiderNoteDto,
  UpdateInsiderNoteDto,
} from '../types'

export const initialValues: CreateInsiderNoteDto = {
  playerId: 0,
  competitionGroupId: 0,
  competitionId: 0,
  description: '',
  informant: '',
  teamId: 0,
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      informant: yup.string().notRequired(),
      description: yup.string().notRequired(),
      playerId: validateId({
        required: true,
        message: t('insider-notes:NO_PLAYER_ERROR'),
      }),
      teamId: validateId(),
      competitionId: validateId(),
      competitionGroupId: validateId(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    informant: yup.string().notRequired(),
    description: yup.string().notRequired(),
    playerId: validateId(),
    teamId: validateId(),
    competitionId: validateId(),
    competitionGroupId: validateId(),
  })
}

export function getInitialStateFromCurrent(
  insiderNote: InsiderNoteDto,
): UpdateInsiderNoteDto {
  const { player, description, informant } = insiderNote

  const values = {
    informant,
    description,
    playerId: player.id,
  }

  return map(values, value => value || '')
}
