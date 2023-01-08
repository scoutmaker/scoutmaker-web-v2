import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { PlayerRoleDetailsCard } from '@/modules/player-roles/details-card'
import { PlayerRoleDto } from '@/modules/player-roles/types'
import { getPlayerRoleById } from '@/services/api/methods/player-roles'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<PlayerRoleDto>(
  ['common', 'player-roles'],
  false,
  async (token, params) => {
    try {
      const data = await getPlayerRoleById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const PlayerRolePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<PlayerRoleDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('PLAYER_ROLE')} />
      <PlayerRoleDetailsCard role={data} />
    </>
  )
}

export default PlayerRolePage
