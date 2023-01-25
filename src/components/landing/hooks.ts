import { sendLandingEmail } from '@/services/api/methods/landing'
import { TModuleName } from '@/services/api/modules'
import { useCreateDocument } from '@/utils/hooks/api/use-create-document'

import { LandingPageEmailDto } from './types'

const moduleName: TModuleName = 'landing'

export const useSendLandingEmail = () =>
  useCreateDocument<LandingPageEmailDto, LandingPageEmailDto>(
    `${moduleName}/email`,
    sendLandingEmail,
  )
