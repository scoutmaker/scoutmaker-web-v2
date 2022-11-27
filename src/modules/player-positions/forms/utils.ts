import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CreatePlayerPostitionDto,
  PlayerPositionDto,
  UpdatePlayerPostitionDto,
} from '../types'

export const initialValues: CreatePlayerPostitionDto = {
  name: '',
  code: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('player-positions:NO_NAME_ERROR')),
      code: yup.string().required(t('player-positions:NO_CODE_ERROR')),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    code: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  position: PlayerPositionDto,
): UpdatePlayerPostitionDto {
  const { name, code } = position

  const values = {
    name,
    code,
  }

  return map(values, value => value || '')
}
