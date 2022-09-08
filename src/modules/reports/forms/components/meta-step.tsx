import { Box, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { PlayersPositionCombo } from '@/modules/player-positions/combo'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { CreateReportDto } from '../../types'

interface IMetaStepProps {
  positionsData: PlayerPositionDto[]
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
}

export const MetaStep = ({
  positionsData,
  teamsData,
  competitionGroupsData,
  competitionsData,
}: IMetaStepProps) => {
  const { t } = useTranslation()
  const { touched, errors } = useFormikContext<CreateReportDto>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography>{t('reports:META_DATA_DISCLAIMER')}</Typography>
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
    </Box>
  )
}
