import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrganizationPlayerAclDetailsCard } from '@/modules/organization-player-acl/details-card'
import { OrganizationPlayerAclDto } from '@/modules/organization-player-acl/types'
import { getOrganizationPlayerAclById } from '@/services/api/methods/organization-player-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrganizationPlayerAclDto>(
  ['common', 'organization-player-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getOrganizationPlayerAclById(
        params?.id as string,
        token,
      )
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const OrganizationPlayerAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationPlayerAclDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('ORGANIZATION_PLAYER_ACE')} />
      <OrganizationPlayerAclDetailsCard data={data} />
    </>
  )
}

export default OrganizationPlayerAclPage
