import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateOrganizationNoteAclDto,
  OrganizationNoteAclDto,
  UpdateOrganizationNoteAclDto,
} from '../types'

export const initialValues: CreateOrganizationNoteAclDto = {
  noteId: '',
  organizationId: '',
  permissionLevel: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      noteId: validateId({
        required: true,
        message: t('organization-note-acl:NO_NOTE_ERROR'),
      }),
      organizationId: validateId({
        required: true,
        message: t('organization-note-acl:NO_ORGANIZATION_ERROR'),
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
  acl: OrganizationNoteAclDto,
): UpdateOrganizationNoteAclDto {
  const { permissionLevel } = acl

  const values = {
    permissionLevel,
  }

  return map(values, value => value || '')
}
