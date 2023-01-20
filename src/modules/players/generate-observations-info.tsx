import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { TFunction } from 'next-i18next'

import { UserDto } from '../users/types'

const generateObservationsInfo = (user: UserDto | undefined, t: TFunction) => {
  if (user?.role === 'PLAYMAKER_SCOUT')
    return t('players:PM_SCOUT_FULL_OBSERVATIONS_INFO')

  if (user?.role === 'SCOUT' && user.organizationId) {
    return separateLink(t('players:SCOUT_ORGANIZATION_FULL_OBSERVATIONS_INFO'))
  }

  if (user?.role === 'SCOUT' && !user.organizationId) {
    return separateLink(t('players:SCOUT_FULL_OBSERVATIONS_INFO'))
  }

  return null
}

export default generateObservationsInfo

const separateLink = (txt: string) => {
  const separated = txt.split('LINK')
  return (
    <>
      {separated[0]}
      <Link href="/" passHref>
        <MuiLink>{separated[1]}</MuiLink>
      </Link>
      {separated[2]}
    </>
  )
}
