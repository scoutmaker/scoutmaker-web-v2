import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateUserInsiderNoteAclDto,
  UpdateUserInsiderNoteAclDto,
  UserInsiderNoteAclDto,
} from '../types'

export const initialValues: CreateUserInsiderNoteAclDto = {
  insiderNoteId: '',
  permissionLevel: '',
  userId: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      userId: validateId({
        required: true,
        message: t('user-insider-note-acl:NO_USER_ERROR'),
      }),
      insiderNoteId: validateId({
        required: true,
        message: t('user-insider-note-acl:NO_INSIDER_NOTE_ERROR'),
      }),
      permissionLevel: yup.string().notRequired(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    permissionLevel: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  acl: UserInsiderNoteAclDto,
): UpdateUserInsiderNoteAclDto {
  const { permissionLevel } = acl

  const values = {
    permissionLevel,
  }

  return map(values, value => value || '')
}
