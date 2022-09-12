import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { TeamAffiliationDetailsCard } from '@/modules/team-affiliations/details-card'
import { TeamAffiliationDto } from '@/modules/team-affiliations/types'
import { getTeamAffiliationById } from '@/services/api/methods/team-affiliations'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<TeamAffiliationDto>(
  ['common', 'team-affiliations'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getTeamAffiliationById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const TeamAffiliationPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<TeamAffiliationDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('TEAM_AFFILIATION')} />
      <TeamAffiliationDetailsCard affiliation={data} />
    </>
  )
}

export default TeamAffiliationPage
