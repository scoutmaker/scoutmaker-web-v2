import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { CreateTeamDto, TeamDto, UpdateTeamDto } from '@/modules/teams/types'
import { validateId } from '@/utils/validation-helpers'

export const initialValues: CreateTeamDto = {
  name: '',
  clubId: '',
  competitionId: '',
  groupId: '',
  minut90url: '',
  transfermarktUrl: '',
}

export function generateCreateTeamValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('teams:NO_NAME_ERROR')),
      clubId: validateId({ required: true, message: t('teams:NO_CLUB_ERROR') }),
      competitionId: validateId({
        required: true,
        message: t('teams:NO_CLUB_ERROR'),
      }),
      groupId: validateId(),
      minut90url: yup.string().url().notRequired(),
      transfermarktUrl: yup.string().url().notRequired(),
    })
    .defined()
}

export function generateUpdateTeamValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    clubId: validateId(),
    minut90url: yup.string().url().notRequired(),
    transfermarktUrl: yup.string().url().notRequired(),
  })
}

export function getInitialStateFromCurrent(team: TeamDto): UpdateTeamDto {
  const { name, club, minut90url, transfermarktUrl } = team

  const values = {
    name,
    clubId: club.id,
    minut90url,
    transfermarktUrl,
  }

  return map(values, value => value || '')
}
