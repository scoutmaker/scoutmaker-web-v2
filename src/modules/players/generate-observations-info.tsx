import { TFunction } from 'next-i18next'

import { separateLink } from '@/utils/separate-link'

import { UserDto } from '../users/types'

const generateObservationsInfo = (user: UserDto | undefined, t: TFunction) => {
  if (user?.role === 'PLAYMAKER_SCOUT')
    return t('players:PM_SCOUT_FULL_OBSERVATIONS_INFO')

  if (user?.role === 'SCOUT' && user.organizationId) {
    return separateLink(
      t('players:SCOUT_ORGANIZATION_FULL_OBSERVATIONS_INFO'),
      '/club-scouting#contactform',
    )
  }

  if (user?.role === 'SCOUT' && !user.organizationId) {
    return separateLink(
      t('players:SCOUT_FULL_OBSERVATIONS_INFO'),
      '/club-scouting#contactform',
    )
  }

  return null
}

export default generateObservationsInfo
