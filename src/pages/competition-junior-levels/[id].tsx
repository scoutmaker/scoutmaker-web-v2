import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionJuniorLevelDetailsCard } from '@/modules/competition-junior-levels/details-card'
import { CompetitionJuniorLevelDto } from '@/modules/competition-junior-levels/types'
import { getCompetitionJuniorLevelById } from '@/services/api/methods/competition-junior-levels'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CompetitionJuniorLevelDto>(['common', 'comp-junior-levels'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getCompetitionJuniorLevelById(
        +(params?.id as string),
        token,
      )
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError
      }
    }
  });

const CompetitionJuniorLevelPage = ({ data, errorMessage, errorStatus }: TSsrRole<CompetitionJuniorLevelDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('COMPETITION_JUNIOR_LEVEL')} />
      <CompetitionJuniorLevelDetailsCard comp={data} />
    </>
  )
}

export default CompetitionJuniorLevelPage
