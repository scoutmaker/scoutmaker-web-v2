import { TextField, Typography } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { MatchesCombo } from '@/modules/matches/combo'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { PlayersPositionCombo } from '@/modules/player-positions/combo'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayersCombo } from '@/modules/players/combo'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { CreateNoteDto, UpdateNoteDto } from '../types'
import { RatingInput } from './rating-input'

interface IFieldsProps {
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  positionsData: PlayerPositionDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const Fields = ({
  playersData,
  matchesData,
  positionsData,
  competitionsData,
  competitionGroupsData,
  teamsData,
}: IFieldsProps) => {
  const { t } = useTranslation()

  const { touched, errors, values } = useFormikContext<
    CreateNoteDto | UpdateNoteDto
  >()

  return (
    <>
      <PlayersCombo
        data={playersData}
        name="playerId"
        label={t('PLAYER')}
        error={touched.playerId && !!errors.playerId}
        helperText={touched.playerId ? errors.playerId : undefined}
      />
      <Field
        name="shirtNo"
        as={TextField}
        type="number"
        inputProps={{ min: 1, max: 99 }}
        variant="outlined"
        fullWidth
        label={t('SHIRT_NUMBER')}
        error={touched.shirtNo && !!errors.shirtNo}
        helperText={touched.shirtNo && errors.shirtNo}
      />
      <MatchesCombo
        data={matchesData}
        name="matchId"
        label={t('MATCH')}
        error={touched.matchId && !!errors.matchId}
        helperText={touched.matchId ? errors.matchId : undefined}
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
      <RatingInput max={values.maxRatingScore || 4} value={values.rating} />
      <Field
        name="description"
        as={TextField}
        variant="outlined"
        fullWidth
        multiline
        label={t('DESCRIPTION')}
        error={touched.description && !!errors.description}
        helperText={touched.description && errors.description}
      />
      <Typography variant="h3">{t('META_DATA')}</Typography>
      <Typography>{t('notes:META_DATA_DISCLAIMER')}</Typography>
      <PlayersPositionCombo
        data={positionsData}
        name="positionPlayedId"
        label={t('PLAYER_POSITION')}
        error={touched.positionPlayedId && !!errors.positionPlayedId}
        helperText={
          touched.positionPlayedId ? errors.positionPlayedId : undefined
        }
      />
      <TeamsCombo
        data={teamsData}
        name="teamId"
        label={t('TEAM')}
        error={touched.teamId && !!errors.teamId}
        helperText={touched.teamId ? errors.teamId : undefined}
      />
      <CompetitionsCombo
        data={competitionsData}
        name="competitionId"
        label={t('COMPETITION')}
        error={touched.competitionId && !!errors.competitionId}
        helperText={touched.competitionId ? errors.competitionId : undefined}
      />
      <CompetitionGroupsCombo
        data={competitionGroupsData}
        name="competitionGroupId"
        label={t('COMPETITION_GROUP')}
        error={touched.competitionGroupId && !!errors.competitionGroupId}
        helperText={
          touched.competitionGroupId ? errors.competitionGroupId : undefined
        }
      />
    </>
  )
}
