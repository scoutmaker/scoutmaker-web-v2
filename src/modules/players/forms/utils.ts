import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CreatePlayerDto,
  Footed,
  PlayerDto,
  UpdatePlayerDto,
} from '@/modules/players/types'
import { validateId, validateIdsArray } from '@/utils/validation-helpers'

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
  lnpUrl: '',
  minut90id: '',
  minut90url: '',
  transfermarktId: '',
  transfermarktUrl: '',
  inStatUrl: '',
  roleId: '',
}

function generateCommonPlayerFieldsValidationSchema() {
  return {
    height: yup.number().notRequired(),
    weight: yup.number().notRequired(),
    street: yup.string().notRequired(),
    secondaryPositionIds: validateIdsArray(),
    lnpUrl: yup.string().url().notRequired(),
    minut90id: yup.string().notRequired(),
    minut90url: yup.string().url().notRequired(),
    transfermarktId: yup.string().notRequired(),
    transfermarktUrl: yup.string().url().notRequired(),
    inStatUrl: yup.string().url().notRequired(),
    roleId: validateId(),
  }
}

export function generateCreatePlayerValidationSchema(t: TFunction) {
  return yup
    .object({
      firstName: yup.string().required(t('players:NO_FIRST_NAME_ERROR')),
      lastName: yup.string().required(t('players:NO_LAST_NAME_ERROR')),
      countryId: validateId({
        required: true,
        message: t('players:NO_COUNTRY_ERROR'),
      }),
      footed: yup
        .string()
        .oneOf<Footed>(
          ['BOTH', 'LEFT', 'RIGHT'],
          t('players:WRONG_FOOTED_VALUE'),
        )
        .notRequired(),
      teamId: validateId({
        required: true,
        message: t('players:NO_TEAM_ERROR'),
      }),
      primaryPositionId: validateId({
        required: true,
        message: t('players:NO_PRIMARY_POSITION_ERROR'),
      }),
      ...generateCommonPlayerFieldsValidationSchema(),
    })
    .defined()
}

export function generateUpdatePlayerValidationSchema(t: TFunction) {
  return yup.object({
    firstName: yup.string().notRequired(),
    lastName: yup.string().notRequired(),
    countryId: validateId(),
    footed: yup
      .string()
      .oneOf<Footed>(['BOTH', 'LEFT', 'RIGHT'], t('players:WRONG_FOOTED_VALUE'))
      .notRequired(),
    teamId: validateId(),
    primaryPositionId: validateId(),
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
    role,
    ...rest
  } = player

  const mappedRest = map({ ...rest }, value => value || '')

  return {
    ...mappedRest,
    countryId: country.id,
    primaryPositionId: primaryPosition.id,
    secondaryPositionIds: secondaryPositions?.map(pos => pos.id) || [],
    roleId: role?.id,
  }
}
