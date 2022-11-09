import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import { CreateNoteDto, NoteDto, UpdateNoteDto } from '../types'

export const initialValues: CreateNoteDto = {
  playerId: '',
  shirtNo: 20,
  matchId: '',
  maxRatingScore: 4,
  rating: 1,
  description: '',
  competitionGroupId: '',
  competitionId: '',
  positionPlayedId: '',
  teamId: '',
  observationType: 'VIDEO',
}

export function generateNoteFormValidationSchema(t: TFunction) {
  return yup
    .object({
      playerId: validateId(),
      shirtNo: yup.number().notRequired(),
      matchId: validateId(),
      maxRatingScore: yup.number().notRequired(),
      rating: yup.number().notRequired(),
      description: yup.string().notRequired(),
      competitionGroupId: validateId(),
      competitionId: validateId(),
      positionPlayedId: validateId(),
      teamId: validateId(),
      observationType: yup
        .string()
        .required(t('notes:NO_OBSERVATION_TYPE_ERROR')),
    })
    .defined()
}

export function getInitialStateFromCurrent(note: NoteDto): UpdateNoteDto {
  const {
    id,
    author,
    createdAt,
    likes,
    match,
    meta,
    percentageRating,
    player,
    ...rest
  } = note

  const mappedRest = map({ ...rest }, value => value || '')

  return {
    ...mappedRest,
    competitionGroupId: meta?.competitionGroup?.id,
    competitionId: meta?.competition?.id,
    positionPlayedId: meta?.position?.id,
    teamId: meta?.team?.id,
    matchId: match?.id,
    playerId: player?.id,
  }
}
