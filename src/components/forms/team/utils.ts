import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { CreateTeamDto, TeamDto, UpdateTeamDto } from '@/types/teams'
import { validateId } from '@/utils/validation-helpers'

export const initialValues: CreateTeamDto = {
  name: '',
  clubId: 0,
  competitionId: 0,
  groupId: 0,
  minut90url: '',
  transfermarktUrl: '',
  lnpId: '',
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
      lnpId: yup.string().notRequired(),
    })
    .defined()
}

export function generateUpdateTeamValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    clubId: validateId(),
    minut90url: yup.string().url().notRequired(),
    transfermarktUrl: yup.string().url().notRequired(),
    lnpId: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(team: TeamDto): UpdateTeamDto {
  const { name, club, minut90url, transfermarktUrl, lnpId } = team

  const values = {
    name,
    clubId: club.id,
    minut90url,
    transfermarktUrl,
    lnpId,
  }

  return map(values, value => value || '')
}
