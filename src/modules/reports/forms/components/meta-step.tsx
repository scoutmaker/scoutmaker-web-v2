import { Box, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import FilteredCompetitonGroups from '@/components/filteredCompetitionGroups/filteredCompetitonGroups'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { mapCompetitionGroupsListToComboOptions } from '@/modules/competition-groups/utils'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { PlayerPositionDto } from '@/modules/player-positions/types'
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
  const { t } = useTranslation(['common', 'reports'])
  const { touched, errors, values } = useFormikContext<CreateReportDto>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography>{t('reports:META_DATA_DISCLAIMER')}</Typography>
      <BasicCombo
        data={mapListDataToComboOptions(positionsData)}
        name="positionPlayedId"
        label={t('POSITION')}
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
        helperText={touched.competitionId ? errors.competitionId : undefined}
      />
      <FilteredCompetitonGroups
        competitionGroupsData={mapCompetitionGroupsListToComboOptions(
          competitionGroupsData,
        )}
        competitionsFormValue={values.competitionId || ''}
        name="competitionGroupId"
        label={t('COMPETITION_GROUP')}
        error={touched.competitionGroupId && !!errors.competitionGroupId}
        helperText={
          touched.competitionGroupId ? errors.competitionGroupId : undefined
        }
        isBasicCombo
      />
    </Box>
  )
}
