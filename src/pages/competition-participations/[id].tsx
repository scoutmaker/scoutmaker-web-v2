import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionParticipationDetailsCard } from '@/modules/competition-participations/details-card'
import { CompetitionParticipationDto } from '@/modules/competition-participations/types'
import { getCompetitionParticipationById } from '@/services/api/methods/competition-participations'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps =
  withSessionSsrRole<CompetitionParticipationDto>(
    ['common', 'comp-participations'],
    ['ADMIN'],
    async (token, params) => {
      try {
        const data = await getCompetitionParticipationById(
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

const CompetitionParticipationPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CompetitionParticipationDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('COMPETITION_PARTICIPANT')} />
      <CompetitionParticipationDetailsCard comp={data} />
    </>
  )
}

export default CompetitionParticipationPage
