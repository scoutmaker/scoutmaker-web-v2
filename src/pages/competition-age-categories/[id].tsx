import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionAgeCategoryDetailsCard } from '@/modules/competition-age-categories/details-card'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { getCompetitionAgeCategoryById } from '@/services/api/methods/competition-age-categories'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps =
  withSessionSsrRole<CompetitionAgeCategortyDto>(
    ['common', 'comp-age-categ'],
    ['ADMIN'],
    async (token, params) => {
      try {
        const data = await getCompetitionAgeCategoryById(
          params?.id as string,
          token,
        )
        return { data }
      } catch (error) {
        return { data: null, error: error as ApiError }
      }
    },
  )

const CompAgeCategPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CompetitionAgeCategortyDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('COMPETITION_AGE_CATEGORY')} />
      <CompetitionAgeCategoryDetailsCard data={data} />
    </>
  )
}

export default CompAgeCategPage
