import map from 'just-map-values'
import * as yup from 'yup'

import { CreateNoteDto, NoteDto, UpdateNoteDto } from '../types'

export const initialValues: CreateNoteDto = {
  playerId: 0,
  shirtNo: 20,
  matchId: 0,
  maxRatingScore: 4,
  rating: 1,
  description: '',
  competitionGroupId: 0,
  competitionId: 0,
  positionPlayedId: 0,
  teamId: 0,
}

export function generateNoteFormValidationSchema() {
  return yup
    .object({
      playerId: yup.number().notRequired(),
      shirtNo: yup.number().notRequired(),
      matchId: yup.number().notRequired(),
      maxRatingScore: yup.number().notRequired(),
      rating: yup.number().notRequired(),
      description: yup.string().notRequired(),
      competitionGroupId: yup.number().notRequired(),
      competitionId: yup.number().notRequired(),
      positionPlayedId: yup.number().notRequired(),
      teamId: yup.number().notRequired(),
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
