import { TFunction } from 'next-i18next'
import * as yup from 'yup'
import map from 'just-map-values'
import { CreateTeamDto, TeamDto, UpdateTeamDto } from '@/types/teams'

export const initialValues: CreateTeamDto = {
  name: '',
  clubId: '',
  competitionId: '',
  groupId: '',
  minut90url: '',
  transfermarktUrl: '',
  lnpId: '',
}

function generateCommonClubFieldsValidationSchema() {
  return {
    lnpId: yup.string().notRequired(),
    city: yup.string().notRequired(),
    postalCode: yup.string().notRequired(),
    street: yup.string().notRequired(),
    website: yup.string().url().notRequired(),
    twitter: yup.string().url().notRequired(),
    facebook: yup.string().url().notRequired(),
    instagram: yup.string().url().notRequired(),
  }
}

export function generateCreateTeamValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('teams:NO_NAME_ERROR')),
      clubId: yup.string().required(t('teams:NO_CLUB_ERROR')),
      competitionId: yup.string().required(t('teams:NO_COMPETITION_ERROR')),
      minut90url: yup.string().url().notRequired(),
      transfermarktUrl: yup.string().url().notRequired(),
      lnpId: yup.string().notRequired(),
    })
    .defined()
}

export function generateUpdateClubValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    regionId: yup.string().notRequired(),
    countryId: yup.string().notRequired(),
    ...generateCommonClubFieldsValidationSchema(),
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
