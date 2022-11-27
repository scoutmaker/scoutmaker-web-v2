import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CreateReportSkillAssessmentCategoryDto,
  ReportSkillAssessmentCategoryDto,
  UpdateReportSkillAssessmentCategoryDto,
} from '../types'

export const initialValues: CreateReportSkillAssessmentCategoryDto = {
  name: '',
}

export function generateCreateFormValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup
        .string()
        .required(t('report-skill-assessment-categories:NO_NAME_ERROR')),
    })
    .defined()
}

export function generateUpdateFormValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  category: ReportSkillAssessmentCategoryDto,
): UpdateReportSkillAssessmentCategoryDto {
  const { name } = category

  const values = {
    name,
  }

  return map(values, value => value || '')
}
