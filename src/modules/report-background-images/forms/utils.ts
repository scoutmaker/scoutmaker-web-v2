import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import {
  CreateReportBgImageDto,
  ReportBgImageDto,
  UpdateReportBgImageDto,
} from '../types'

export const initialValues: CreateReportBgImageDto = {
  name: '',
  isPublic: true,
  url: '',
}

export function generateCreateValidationSchema(t: TFunction) {
  return yup
    .object({
      name: yup.string().required(t('report-bg-images:NO_NAME_ERROR')),
      url: yup.string().url().required(t('report-bg-images:NO_URL_ERROR')),
      isPublic: yup.boolean().required(),
    })
    .defined()
}

export function generateUpdateValidationSchema() {
  return yup.object({
    name: yup.string().notRequired(),
    url: yup.string().url().notRequired(),
  })
}

export function getInitialStateFromCurrent(
  bgimg: ReportBgImageDto,
): UpdateReportBgImageDto {
  const { name, url } = bgimg

  const values = {
    name,
    url,
  }

  return map(values, value => value || '')
}
