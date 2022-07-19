import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CreatePlayerDto,
  Footed,
  PlayerDto,
  UpdatePlayerDto,
} from '@/types/players'

export const initialValues: CreatePlayerDto = {
  firstName: '',
  lastName: '',
  countryId: '',
  yearOfBirth: 2000,
  height: 180,
  weight: 70,
  footed: 'RIGHT',
  teamId: '',
  primaryPositionId: '',
  secondaryPositionIds: [],
  lnpId: '',
  lnpUrl: '',
  minut90id: '',
  minut90url: '',
  transfermarktId: '',
  transfermarktUrl: '',
}

function generateCommonPlayerFieldsValidationSchema() {
  return {
    height: yup.number().notRequired(),
    weight: yup.number().notRequired(),
    street: yup.string().notRequired(),
    secondaryPositionIds: yup.array().of(yup.string()).notRequired(),
    lnpId: yup.string().notRequired(),
    lnpUrl: yup.string().url().notRequired(),
    minut90id: yup.string().notRequired(),
    minut90url: yup.string().url().notRequired(),
    transfermarktId: yup.string().notRequired(),
    transfermarktUrl: yup.string().url().notRequired(),
  }
}

export function generateCreatePlayerValidationSchema(t: TFunction) {
  return yup
    .object({
      firstName: yup.string().required(t('players:NO_FIRST_NAME_ERROR')),
      lastName: yup.string().required(t('players:NO_LAST_NAME_ERROR')),
      countryId: yup.string().required(t('players:NO_COUNTRY_ERROR')),
      footed: yup
        .string()
        .oneOf<Footed>(
          ['BOTH', 'LEFT', 'RIGHT'],
          t('players:WRONG_FOOTED_VALUE'),
        )
        .required(t('players:NO_FOOTED_ERROR')),
      teamId: yup.string().required(t('players:NO_TEAM_ERROR')),
      primaryPositionId: yup
        .string()
        .required(t('players:NO_PRIMARY_POSITION_ERROR')),
      ...generateCommonPlayerFieldsValidationSchema(),
    })
    .defined()
}

export function generateUpdatePlayerValidationSchema(t: TFunction) {
  return yup.object({
    firstName: yup.string().notRequired(),
    lastName: yup.string().notRequired(),
    countryId: yup.string().notRequired(),
    footed: yup
      .string()
      .oneOf<Footed>(['BOTH', 'LEFT', 'RIGHT'], t('players:WRONG_FOOTED_VALUE'))
      .notRequired(),
    teamId: yup.string().notRequired(),
    primaryPositionId: yup.string().notRequired(),
    ...generateCommonPlayerFieldsValidationSchema(),
  })
}

export function getInitialStateFromCurrent(player: PlayerDto): UpdatePlayerDto {
  const {
    id,
    _count: count,
    country,
    likes,
    primaryPosition,
    secondaryPositions,
    slug,
    teams,
    ...rest
  } = player

  const values = {
    ...rest,
    countryId: country.id,
    primaryPositionId: primaryPosition.id,
    secondaryPositionIds: secondaryPositions.map(pos => pos.id),
  }

  return map(values, value => value || '')
}
