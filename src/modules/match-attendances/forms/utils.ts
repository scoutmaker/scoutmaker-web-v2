import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { AddMatchAttendanceDto, MatchAttendanceDto } from '../types'

export function generateValidationSchema(t: TFunction) {
  return yup
    .object({
      matchId: yup
        .string()
        .nullable()
        .required(t('go-to-match:NO_MATCH_ERROR')),
      observationType: yup
        .string()
        .nullable()
        .required(t('go-to-match:NO_OBSERVATION_TYPE_ERROR')),
    })
    .defined()
}

export function getInitialStateFromCurrent(
  attendance: MatchAttendanceDto | undefined | null,
): AddMatchAttendanceDto {
  if (!attendance) return { matchId: '', observationType: 'VIDEO' }

  const { match, observationType } = attendance
  return {
    matchId: match.id,
    observationType,
  }
}
