import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { getObservationTypeComboData } from '@/components/combos-data/observation-type'
import { ExpandMoreIcon } from '@/components/icons'
import { RatingInput } from '@/components/rating-input/rating-input'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { MatchBasicDataDto } from '@/modules/matches/types'
import { mapMatchesListToComboOptions } from '@/modules/matches/utils'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { CreateNoteDto, UpdateNoteDto } from '../types'

export const AccordionInnerContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(0, 'auto', 2),
  gap: theme.spacing(2),
}))

interface IFieldsProps {
  playersData: PlayerBasicDataDto[]
  matchesData: MatchBasicDataDto[]
  positionsData: PlayerPositionDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  matchDisabled?: boolean
}

export const Fields = ({
  playersData,
  matchesData,
  positionsData,
  competitionsData,
  competitionGroupsData,
  teamsData,
  matchDisabled,
}: IFieldsProps) => {
  const { t } = useTranslation()

  const { touched, errors, values } = useFormikContext<
    CreateNoteDto | UpdateNoteDto
  >()

  return (
    <>
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
      <Accordion sx={{ background: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="meta-data-fields-content"
          id="meta-data-fields-header"
        >
          <Typography sx={{ fontWeight: 'bold' }}>{t('META_DATA')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionInnerContainer>
            <Typography>{t('notes:META_DATA_DISCLAIMER')}</Typography>
            <BasicCombo
              data={mapListDataToComboOptions(positionsData)}
              name="positionPlayedId"
              label={t('PLAYER_POSITION')}
              error={touched.positionPlayedId && !!errors.positionPlayedId}
              helperText={
                touched.positionPlayedId ? errors.positionPlayedId : undefined
              }
            />
            <BasicCombo
              data={mapListDataToComboOptions(teamsData)}
              name="teamId"
              label={t('TEAM')}
              error={touched.teamId && !!errors.teamId}
              helperText={touched.teamId ? errors.teamId : undefined}
            />
            <BasicCombo
              data={mapCompetitionsListToComboOptions(competitionsData)}
              name="competitionId"
              label={t('COMPETITION')}
              error={touched.competitionId && !!errors.competitionId}
              helperText={
                touched.competitionId ? errors.competitionId : undefined
              }
            />
            <BasicCombo
              data={mapCompetitionGroupsListToComboOptions(
                competitionGroupsData,
              )}
              name="competitionGroupId"
              label={t('COMPETITION_GROUP')}
              error={touched.competitionGroupId && !!errors.competitionGroupId}
              helperText={
                touched.competitionGroupId
                  ? errors.competitionGroupId
                  : undefined
              }
            />
          </AccordionInnerContainer>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
