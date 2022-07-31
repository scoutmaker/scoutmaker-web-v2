import { Grid, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { CompetitionGroupsCombo } from '@/modules/competition-groups/combo'
import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { CreateMatchDto, UpdateMatchDto } from '@/modules/matches/types'
import { SeasonsCombo } from '@/modules/seasons/combo'
import { SeasonDto } from '@/modules/seasons/types'
import { TeamsCombo } from '@/modules/teams/combo'
import { TeamBasicDataDto } from '@/modules/teams/types'

interface IFieldsProps {
  teamsData: TeamBasicDataDto[]
  competitionsData: CompetitionBasicDataDto[]
  competitionGroupsData: CompetitionGroupBasicDataDto[]
  seasonsData: SeasonDto[]
}

export const Fields = ({
  teamsData,
  competitionsData,
  competitionGroupsData,
  seasonsData,
}: IFieldsProps) => {
  const { t } = useTranslation(['common', 'matches'])

  const { touched, errors } = useFormikContext<
    CreateMatchDto | UpdateMatchDto
  >()

  return (
    <>
      <TeamsCombo
        data={teamsData}
        name="homeTeamId"
        label={t('HOME_TEAM')}
        error={touched.homeTeamId && !!errors.homeTeamId}
        helperText={touched.homeTeamId ? errors.homeTeamId : undefined}
      />
      <TeamsCombo
        data={teamsData}
        name="awayTeamId"
        label={t('AWAY_TEAM')}
        error={touched.awayTeamId && !!errors.awayTeamId}
        helperText={touched.awayTeamId ? errors.awayTeamId : undefined}
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
        name="groupId"
        label={t('COMPETITION_GROUP')}
        error={touched.groupId && !!errors.groupId}
        helperText={touched.groupId ? errors.groupId : undefined}
      />
      <SeasonsCombo
        data={seasonsData}
        name="seasonId"
        label={t('SEASON')}
        error={touched.seasonId && !!errors.seasonId}
        helperText={touched.seasonId ? errors.seasonId : undefined}
      />
      <Field
        name="date"
        as={TextField}
        type="date"
        variant="outlined"
        fullWidth
        label={t('DATE')}
        error={touched.date && !!errors.date}
        helperText={touched.date ? errors.date : undefined}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Field
            name="homeGoals"
            as={TextField}
            type="number"
            inputProps={{ min: 0, max: 20 }}
            variant="outlined"
            fullWidth
            label={t('matches:HOME_GOALS')}
            error={touched.homeGoals && !!errors.homeGoals}
            helperText={touched.homeGoals ? errors.homeGoals : undefined}
          />
        </Grid>
        <Grid item xs={6}>
          <Field
            name="awayGoals"
            as={TextField}
            type="number"
            inputProps={{ min: 0, max: 20 }}
            variant="outlined"
            fullWidth
            label={t('matches:AWAY_GOALS')}
            error={touched.awayGoals && !!errors.awayGoals}
            helperText={touched.awayGoals ? errors.awayGoals : undefined}
          />
        </Grid>
      </Grid>
      <Field
        name="videoUrl"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('VIDEO_URL')}
        error={touched.videoUrl && !!errors.videoUrl}
        helperText={
          (touched.videoUrl && errors.videoUrl) || t('OPTIONAL_FIELD')
        }
      />
    </>
  )
}
