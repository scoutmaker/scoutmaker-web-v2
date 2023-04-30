import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateIdsArray } from '@/utils/validation-helpers'

import {
  CreateReportTemplateDto,
  ReportTemplateDto,
  UpdateReportTemplateDto,
} from '../types'

export const initialValues: CreateReportTemplateDto = {
  maxRatingScore: 2,
  name: '',
  skillAssessmentTemplateIds: [],
  isPublic: true,
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('report-templates:NO_NAME_ERROR')),
      maxRatingScore: yup
        .number()
        .min(2)
        .max(20)
        .required(t('report-templates:NO_RATING_ERROR')),
      skillAssessmentTemplateIds: validateIdsArray().min(1).required(),
      isPublic: yup.boolean().notRequired(),
      compactCategoriesIds: validateIdsArray().notRequired(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    maxRatingScore: yup.number().min(2).max(20).notRequired(),
    skillAssessmentTemplateIds: validateIdsArray().notRequired(),
    isPublic: yup.boolean().notRequired(),
    compactCategoriesIds: validateIdsArray().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  repTemplate: ReportTemplateDto,
): UpdateReportTemplateDto {
  const {
    name,
    maxRatingScore,
    skillAssessmentTemplates,
    compactCategoriesIds,
  } = repTemplate

  const values = {
    name,
    maxRatingScore,
    compactCategoriesIds,
    skillAssessmentTemplateIds: skillAssessmentTemplates.map(t => t.id),
  }

  return map(values, value => value || '')
}
