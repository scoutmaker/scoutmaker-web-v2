import * as yup from 'yup'

import { UserDto } from '@/modules/users/types'
import { validateId } from '@/utils/validation-helpers'

import { SettingsDto } from '../types'

export function generateValidationSchema() {
  return yup
    .object({
      reportTemplateId: validateId().notRequired(),
      reportBackgroundImageId: validateId().notRequired(),
    })
    .defined()
}

export function getInitialStateFromCurrent(
  user: UserDto | undefined,
): SettingsDto {
  if (!user) return { reportBackgroundImageId: '', reportTemplateId: '' }

  return {
    reportBackgroundImageId: user.reportBackgroundImage?.id || '',
    reportTemplateId: user.reportTemplateId || '',
  }
}
