import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionDto } from '@/modules/competitions/types'
import { getCompetitionById } from '@/services/api/methods/competitions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

import { CompetitionDetailsCard } from '../../modules/competitions/details-card'

export const getServerSideProps = withSessionSsrRole<CompetitionDto>(['common', 'competitions'], false,
  async (token, params) => {
    try {
      const data = await getCompetitionById(+(params?.id as string), token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const CompetitionPage = ({ data, errorMessage, errorStatus }: TSsrRole<CompetitionDto>) => {
  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={data.name} />
      <CompetitionDetailsCard comp={data} />
    </>
  )
}

export default CompetitionPage
