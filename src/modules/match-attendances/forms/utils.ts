import { TFunction } from 'next-i18next'
import * as yup from 'yup'

import { MatchAttendanceDto } from '../types'

export function generateValidationSchema(t: TFunction) {
  return yup
    .object({
      matchId: yup
        .string()
        .nullable()
        .required(t('go-to-match:NO_MATCH_ERROR')),
    })
    .defined()
}

export function getInitialStateFromCurrent(
  attendance: MatchAttendanceDto | undefined | null,
): {
  matchId: string
} {
  if (!attendance) return { matchId: '' }

  const { match } = attendance
  return {
    matchId: match.id,
  }
}
