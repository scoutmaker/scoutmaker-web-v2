import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { MatchDetailsCard } from '@/modules/matches/details-card'
import { MatchDto } from '@/modules/matches/types'
import { getMatchDisplayName } from '@/modules/matches/utils'
import { getMatchById } from '@/services/api/methods/matches'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<MatchDto>(
  ['common', 'matches'],
  false,
  async (token, params) => {
    try {
      const data = await getMatchById(params?.id as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const MatchPage = ({ data, errorMessage, errorStatus }: TSsrRole<MatchDto>) => {
  if (data) {
    return (
      <>
        <PageHeading
          title={getMatchDisplayName({
            homeTeamName: data.homeTeam.name,
            awayTeamName: data.awayTeam.name,
          })}
        />
        <MatchDetailsCard match={data} />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default MatchPage
