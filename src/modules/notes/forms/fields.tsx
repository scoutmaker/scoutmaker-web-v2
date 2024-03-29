import { Divider, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { getObservationTypeComboData } from '@/components/combos-data/observation-type'
import { RatingInput } from '@/components/rating-input/rating-input'
import { useActiveMatchAttendance } from '@/modules/match-attendances/hooks'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'

import { CreateNoteDto, NoteBasicDataDto, UpdateNoteDto } from '../types'
import { mapNotesListToComboOptions } from '../utils'

interface IFieldsProps {
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  positionsData: PlayerPositionDto[]
  notesData: NoteBasicDataDto[]
  matchDisabled?: boolean
  matchId?: string
}

export const Fields = ({
  playersData,
  matchesData,
  positionsData,
  matchDisabled,
  notesData,
  matchId,
}: IFieldsProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: matchAttendance } = useActiveMatchAttendance()

  const { touched, errors, values } = useFormikContext<
    CreateNoteDto | UpdateNoteDto
  >()

  return (
    <>
      {matchId && (
        <>
          <BasicCombo
            disabled={false}
            data={mapNotesListToComboOptions(notesData)}
            name="notes-edit-list"
            label={t('notes:EDIT_NOTES_LIST')}
            onChange={(_, value) => {
              if (value)
                router.push(`/notes/edit/${value}?quickMatchId=${matchId}`)
              else
                router.push(
                  `/notes/create${
                    matchAttendance
                      ? `?matchId=${matchAttendance.match.id}&observationType=${matchAttendance.observationType}`
                      : ''
                  }`,
                )
            }}
          />
          <Divider />
        </>
      )}
      <BasicCombo
        data={mapPlayersListToComboOptions(playersData)}
        name="playerId"
        label={t('PLAYER')}
        error={touched.playerId && !!errors.playerId}
        helperText={touched.playerId ? errors.playerId : undefined}
        filterBeforeComma
      />
      <Field
        name="shirtNo"
        as={TextField}
        type="number"
        inputProps={{ min: 1, max: 99 }}
        variant="outlined"
        fullWidth
        label={t('SHIRT_NO')}
        error={touched.shirtNo && !!errors.shirtNo}
        helperText={touched.shirtNo && errors.shirtNo}
      />
      <BasicCombo
        data={mapListDataToComboOptions(positionsData)}
        name="positionPlayedId"
        label={t('notes:POSITION_PLAYED')}
        error={touched.positionPlayedId && !!errors.positionPlayedId}
        helperText={
          (touched.positionPlayedId && errors.positionPlayedId) ||
          t('notes:PLAYER_POSITION_INFO')
        }
      />
      <BasicCombo
        data={mapMatchesListToComboOptions(matchesData)}
        name="matchId"
        label={t('MATCH')}
        error={touched.matchId && !!errors.matchId}
        helperText={touched.matchId ? errors.matchId : undefined}
        disabled={matchDisabled}
      />
      <Field
        name="maxRatingScore"
        as={TextField}
        type="number"
        inputProps={{ min: 2, max: 20 }}
        variant="outlined"
        fullWidth
        label={t('MAX_RATING_SCORE')}
        error={touched.maxRatingScore && !!errors.maxRatingScore}
        helperText={touched.maxRatingScore && errors.maxRatingScore}
      />
      <RatingInput max={values.maxRatingScore || 4} name="rating" />
      <Field
        name="description"
        as={TextField}
        variant="outlined"
        fullWidth
        multiline
        label={t('TEXT')}
        error={touched.description && !!errors.description}
        helperText={touched.description && errors.description}
      />
      <BasicCombo
        data={getObservationTypeComboData(t)}
        name="observationType"
        label={t('OBSERVATION_TYPE')}
        error={touched.observationType && !!errors.observationType}
        helperText={
          touched.observationType ? errors.observationType : undefined
        }
      />
    </>
  )
}
