import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CreateUserFootballRoleDto,
  UpdateUserFootballRoleDto,
  UserFootballRoleDto,
} from '../types'

export const initialValues: CreateUserFootballRoleDto = {
  name: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('user-football-roles:NO_NAME_ERROR')),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  role: UserFootballRoleDto,
): UpdateUserFootballRoleDto {
  const { name } = role

  const values = {
    name,
  }

  return map(values, value => value || '')
}
