import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateOrganizationReportAclDto,
  OrganizationReportAclDto,
  UpdateOrganizationReportAclDto,
} from '../types'

export const initialValues: CreateOrganizationReportAclDto = {
  organizationId: '',
  reportId: '',
  permissionLevel: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      organizationId: validateId({
        required: true,
        message: t('organization-report-acl:NO_ORGANIZATION_ERROR'),
      }),
      reportId: validateId({
        required: true,
        message: t('organization-report-acl:NO_REPORT_ERROR'),
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
  acl: OrganizationReportAclDto,
): UpdateOrganizationReportAclDto {
  const { permissionLevel } = acl

  const values = {
    permissionLevel,
  }

  return map(values, value => value || '')
}
