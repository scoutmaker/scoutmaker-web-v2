import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateOrganizationInsiderNoteAclDto,
  OrganizationInsiderNoteAclDto,
  UpdateOrganizationInsiderNoteAclDto,
} from '../types'

export const initialValues: CreateOrganizationInsiderNoteAclDto = {
  insiderNoteId: '',
  organizationId: '',
  permissionLevel: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      insiderNoteId: validateId({
        required: true,
        message: t('organization-insider-note-acl:NO_INSIDER_NOTE_ERROR'),
      }),
      organizationId: validateId({
        required: true,
        message: t('organization-insider-note-acl:NO_ORGANIZATION_ERROR'),
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
  acl: OrganizationInsiderNoteAclDto,
): UpdateOrganizationInsiderNoteAclDto {
  const { permissionLevel } = acl

  const values = {
    permissionLevel,
  }

  return map(values, value => value || '')
}
