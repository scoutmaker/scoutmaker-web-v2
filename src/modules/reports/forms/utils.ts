import { diff } from 'deep-object-diff'
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

export const createReportFormInitialValues: CreateReportDto = {
  playerId: '',
  templateId: '',
  assists: 0,
  competitionGroupId: '',
  competitionId: '',
  finalRating: 0,
  goals: 0,
  matchId: '',
  minutesPlayed: 0,
  positionPlayedId: '',
  redCards: 0,
  shirtNo: 20,
  skillAssessments: [],
  summary: '',
  teamId: '',
  videoDescription: '',
  videoUrl: '',
  yellowCards: 0,
  observationType: 'VIDEO',
}

const commonReportFormValidationSchemaFields = {
  shirtNo: yup.number().integer().min(1).max(99).notRequired(),
  minutesPlayed: yup.number().integer().min(0).max(120).notRequired(),
  goals: yup.number().integer().min(0).notRequired(),
  assists: yup.number().integer().min(0).notRequired(),
  yellowCards: yup.number().integer().min(0).max(2).notRequired(),
  redCards: yup.number().integer().min(0).max(1).notRequired(),
  videoUrl: yup.string().url().notRequired(),
  videoDescription: yup.string().notRequired(),
  summary: yup.string().notRequired(),
}

export function generateCreateReportFormValidationSchema(t: TFunction) {
  return yup
    .object({
      ...commonReportFormValidationSchemaFields,
      templateId: validateId({
        required: true,
        message: t('reports:NO_TEMPLATE_ERROR'),
      }),
      playerId: validateId({
        required: true,
        message: t('reports:NO_PLAYER_ERROR'),
      }),
      observationType: yup.string().notRequired(),
    })
    .defined()
}

export function generateEditReportFormValidationSchema() {
  return yup
    .object({
      ...commonReportFormValidationSchemaFields,
      observationType: yup.string().notRequired(),
    })
    .defined()
}

export function formatCreateReportDto(data: CreateReportDto): CreateReportDto {
  const {
    finalRating,
    skillAssessments,
    goals,
    assists,
    minutesPlayed,
    redCards,
    yellowCards,
    ...rest
  } = data

  const parsedRating =
    typeof finalRating === 'string' ? parseInt(finalRating) : finalRating

  const assessmentsWithParsedRatings = skillAssessments?.map(assessment => ({
    ...assessment,
    rating:
      typeof assessment.rating === 'string'
        ? parseInt(assessment.rating)
        : assessment.rating,
  }))

  const filteredData = filter(
    {
      ...rest,
      finalRating: parsedRating,
      skillAssessments: assessmentsWithParsedRatings,
    },
    (_, value) => value,
  )

  return {
    ...filteredData,
    goals: goals || 0,
    assists: assists || 0,
    minutesPlayed: minutesPlayed || 0,
    redCards: redCards || 0,
    yellowCards: yellowCards || 0,
  } as CreateReportDto
}

interface IFormatUpdateReportDto {
  initialValues: UpdateReportDto
  data: UpdateReportDto
}

export function formatUpdateReportDto({
  initialValues,
  data,
}: IFormatUpdateReportDto): UpdateReportDto {
  // Get updated values
  const updated: UpdateReportDto = diff(initialValues, data)

  const { finalRating, skillAssessments, ...rest } = updated

  // Parse final rating - if it's defined and of type string
  const parsedRating =
    typeof finalRating === 'string' ? parseInt(finalRating) : finalRating

  // If updated.skillAssessments object exists, we want to send entire
  // skill assessments array from data object to the backend with parsed
  // ratings
  const assessmentsWithParsedRatings = skillAssessments
    ? data.skillAssessments?.map(assessment => ({
        ...assessment,
        rating:
          typeof assessment.rating === 'string'
            ? parseInt(assessment.rating)
            : assessment.rating,
      }))
    : undefined

  // Filter out undefined values

  // Keys for which 0 is a valid value & we don't want to filter them out
  const possibleZeroValueKeys = [
    'goals',
    'assists',
    'minutesPlayed',
    'redCards',
    'yellowCards',
  ]

  const filteredData = filter(
    {
      ...rest,
      finalRating: parsedRating,
      skillAssessments: assessmentsWithParsedRatings,
    },
    (key, value) => (possibleZeroValueKeys.includes(key) ? true : value),
  )

  return filteredData
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
    avgRating,
    redCards,
    yellowCards,
    assists,
    goals,
    maxRatingScore,
    status,
    skills,
    ...rest
  } = report

  const mappedRest = map(
    {
      ...rest,
      skillAssessments: skills.map(skill => ({
        description: skill.description,
        rating: skill.rating,
        templateId: skill.template.id,
      })),
    },
    value => value || '',
  )

  return {
    ...mappedRest,
    redCards,
    yellowCards,
    assists,
    goals,
    competitionGroupId: meta?.competitionGroup?.id || '',
    competitionId: meta?.competition?.id || '',
    positionPlayedId: meta?.position?.id || '',
    teamId: meta?.team?.id || '',
    matchId: match?.id || '',
    playerId: player?.id || '',
  }
}
