import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateUserNoteAclDto,
  UpdateUserNoteAclDto,
  UserNoteAclDto,
} from '../types'

export const initialValues: CreateUserNoteAclDto = {
  noteId: '',
  permissionLevel: '',
  userId: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      noteId: validateId({
        required: true,
        message: t('user-note-acl:NO_NOTE_ERROR'),
      }),
      userId: validateId({
        required: true,
        message: t('user-note-acl:NO_USER_ERROR'),
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
  acl: UserNoteAclDto,
): UpdateUserNoteAclDto {
  const { permissionLevel } = acl

  const values = {
    permissionLevel,
  }

  return map(values, value => value || '')
}
