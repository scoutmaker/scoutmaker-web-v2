import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { validateId } from '@/utils/validation-helpers'

import {
  CreateReportSkillAssessmentTemplateDto,
  ReportSkillAssessmentTemplateDto,
  UpdateReportSkillAssessmentTemplateDto,
} from '../types'

export const initialValues: CreateReportSkillAssessmentTemplateDto = {
  name: '',
  categoryId: '',
  hasScore: false,
  shortName: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup
        .string()
        .required(t('report-skill-assessment-templates:NO_NAME_ERROR')),
      categoryId: validateId({
        required: true,
        message: t('report-skill-assessment-templates:NO_CATEGORY_ERROR'),
      }),
      hasScore: yup.boolean().required(),
      shortName: yup
        .string()
        .required(t('report-skill-assessment-templates:NO_SHORTNAME_ERROR')),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    categoryId: validateId(),
    hasScore: yup.boolean(),
    shortName: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  report: ReportSkillAssessmentTemplateDto,
): UpdateReportSkillAssessmentTemplateDto {
  const { name, category, hasScore, shortName } = report

  const values = {
    name,
    categoryId: category.id,
    hasScore,
    shortName,
  }

  return map(values, value => value || '')
}
