import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { formatDate } from '@/utils/format-date'
import { validateIdsArray } from '@/utils/validation-helpers'

import {
  CreateOrganizationSubscriptionDto,
  OrganizationSubscriptionDto,
  UpdateOrganizationSubscriptionDto,
} from '../types'

export const initialValues: CreateOrganizationSubscriptionDto = {
  endDate: formatDate(),
  startDate: formatDate(),
  competitionGroupIds: [],
  competitionIds: [],
  organizationId: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      organizationId: yup
        .string()
        .required(t('organization-subs:NO_ORGANIZATION_ERROR')),
      competitionGroupIds: validateIdsArray().min(1).required(),
      competitionIds: validateIdsArray().min(1).required(),
      startDate: yup
        .date()
        .required(t('organization-subs:NO_START_DATE_ERROR')),
      endDate: yup.date().required(t('organization-subs:NO_END_DATE_ERROR')),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    competitionGroupIds: validateIdsArray().notRequired(),
    competitionIds: validateIdsArray().notRequired(),
    startDate: yup.date().notRequired(),
    endDate: yup.date().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  sub: OrganizationSubscriptionDto,
): UpdateOrganizationSubscriptionDto {
  const { endDate, startDate, competitionGroups, competitions, organization } =
    sub

  const values = {
    organizationId: organization.id,
    competitionGroupIds: competitionGroups.map(g => g.id),
    competitionIds: competitions.map(c => c.id),
  }

  const mapped = map(values, value => value || '')

  return {
    endDate: formatDate(endDate),
    startDate: formatDate(startDate),
    ...mapped,
  }
}
