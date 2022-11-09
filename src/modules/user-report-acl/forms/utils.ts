import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateUserReportAclDto,
  UpdateUserReportAclDto,
  UserReportAclDto,
} from '../types'

export const initialValues: CreateUserReportAclDto = {
  reportId: '',
  permissionLevel: '',
  userId: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      reportId: validateId({
        required: true,
        message: t('user-report-acl:NO_REPORT_ERROR'),
      }),
      userId: validateId({
        required: true,
        message: t('user-report-acl:NO_USER_ERROR'),
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
  acl: UserReportAclDto,
): UpdateUserReportAclDto {
  const { permissionLevel } = acl

  const values = {
    permissionLevel,
  }

  return map(values, value => value || '')
}
