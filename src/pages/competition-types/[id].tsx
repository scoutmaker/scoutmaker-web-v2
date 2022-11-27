import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionTypeDetailsCard } from '@/modules/competition-types/details-card'
import { CompetitionTypeDto } from '@/modules/competition-types/types'
import { getCompetitionTypeById } from '@/services/api/methods/competition-types'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CompetitionTypeDto>(
  ['common', 'competition-types'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getCompetitionTypeById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const CompetitionTypePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CompetitionTypeDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('COMPETITION_TYPE')} />
      <CompetitionTypeDetailsCard data={data} />
    </>
  )
}

export default CompetitionTypePage
