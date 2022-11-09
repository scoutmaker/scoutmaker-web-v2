import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { UserPlayerAclDetailsCard } from '@/modules/user-player-acl/details-card'
import { UserPlayerAclDto } from '@/modules/user-player-acl/types'
import { getUserPlayerAclById } from '@/services/api/methods/user-player-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserPlayerAclDto>(
  ['common', 'user-player-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserPlayerAclById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const UserPlayerAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserPlayerAclDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('USER_PLAYER_ACE')} />
      <UserPlayerAclDetailsCard data={data} />
    </>
  )
}

export default UserPlayerAclPage
