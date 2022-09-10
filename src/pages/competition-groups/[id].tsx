import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CompetitionGroupDetailsCard } from '@/modules/competition-groups/details-card'
import { CompetitionGroupDto } from '@/modules/competition-groups/types'
import { getCompetitionGroupById } from '@/services/api/methods/competition-groups'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CompetitionGroupDto>(['common', 'comp-groups'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getCompetitionGroupById(
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

const CompetitionGroupPage = ({ data, errorMessage, errorStatus }: TSsrRole<CompetitionGroupDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('COMPETITION_GROUP')} />
      <CompetitionGroupDetailsCard group={data} />
    </>
  )
}

export default CompetitionGroupPage
