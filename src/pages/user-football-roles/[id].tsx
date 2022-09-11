import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { UserFootballRoleDetailsCard } from '@/modules/user-football-roles/details-card'
import { UserFootballRoleDto } from '@/modules/user-football-roles/types'
import { getUserFootballRoleById } from '@/services/api/methods/user-football-roles'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserFootballRoleDto>(
  ['common', 'user-football-role'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserFootballRoleById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const SeasonPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserFootballRoleDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('FOOTBALL_ROLE')} />
      <UserFootballRoleDetailsCard role={data} />
    </>
  )
}

export default SeasonPage
