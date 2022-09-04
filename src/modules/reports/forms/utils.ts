import { FormikErrors, FormikTouched } from 'formik'
import filter from 'just-filter-object'
import map from 'just-map-values'
import { TFunction } from 'next-i18next'
import { ReactNode } from 'react'
import * as yup from 'yup'

import {
  CreateReportDto,
  ReportDto,
  UpdateReportDto,
} from '@/modules/reports/types'
import { validateId } from '@/utils/validation-helpers'

export const initialValues: CreateReportDto = {
  playerId: 0,
  templateId: 0,
  assists: 0,
  competitionGroupId: 0,
  competitionId: 0,
  finalRating: 0,
  goals: 0,
  matchId: 0,
  minutesPlayed: 0,
  positionPlayedId: 0,
  redCards: 0,
  shirtNo: 0,
  skillAssessments: [],
  summary: '',
  teamId: 0,
  videoDescription: '',
  videoUrl: '',
  yellowCards: 0,
}

export function generateReportFormValidationSchema(t: TFunction) {
  return yup
    .object({
      shirtNo: yup.number().integer().min(1).max(99).notRequired(),
      minutesPlayed: yup.number().integer().min(0).max(120).notRequired(),
      goals: yup.number().integer().min(0).notRequired(),
      assists: yup.number().integer().min(0).notRequired(),
      yellowCards: yup.number().integer().min(0).max(2).notRequired(),
      redCards: yup.number().integer().min(0).max(1).notRequired(),
      videoUrl: yup.string().url().notRequired(),
      videoDescription: yup.string().notRequired(),
      summary: yup.string().notRequired(),
      templateId: validateId({
        required: true,
        message: t('reports:NO_TEMPLATE_ERROR'),
      }),
      playerId: validateId({
        required: true,
        message: t('reports:NO_PLAYER_ERROR'),
      }),
    })
    .defined()
}

export function formatCreateReportDto(data: CreateReportDto) {
  const { finalRating, skillAssessments, ...rest } = data

  const parsedRating =
    typeof finalRating === 'string' ? parseInt(finalRating) : finalRating
  const assessmentsWithParsedRatings = skillAssessments?.map(assessment => ({
    ...assessment,
    rating:
      typeof assessment.rating === 'string'
        ? parseInt(assessment.rating)
        : assessment.rating,
  }))

  return filter(
    {
      ...rest,
      finalRating: parsedRating,
      skillAssessments: assessmentsWithParsedRatings,
    },
    (_, value) => value,
  )
}

export type TStep = {
  title: string
  content: ReactNode
  errorKeys?: Array<keyof CreateReportDto>
}

type GetStepErrorArgs = {
  errors: FormikErrors<CreateReportDto>
  touched: FormikTouched<CreateReportDto>
  step: TStep
}

export function getStepError({ errors, touched, step }: GetStepErrorArgs) {
  const stepErrors: Array<keyof CreateReportDto> = []
  step.errorKeys?.forEach(key => {
    if (touched[key] && errors[key]) {
      stepErrors.push(key)
    }
  })
  return !!stepErrors.length
}

export function getInitialStateFromCurrent(report: ReportDto): UpdateReportDto {
  const {
    id,
    author,
    createdAt,
    likes,
    match,
    meta,
    percentageRating,
    player,
    ...rest
  } = report

  const mappedRest = map({ ...rest }, value => value || '')

  return {
    ...mappedRest,
    competitionGroupId: meta?.competitionGroup?.id,
    competitionId: meta?.competition?.id,
    positionPlayedId: meta?.position?.id,
    teamId: meta?.team?.id,
    matchId: match?.id,
    playerId: player?.id,
  }
}
