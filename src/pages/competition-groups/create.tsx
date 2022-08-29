import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateCompetitionGroupForm } from '@/modules/competition-groups/forms/create'
import { useCreateCompetitionGroup } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'comp-groups'], ['ADMIN'])

const CreateCompetitionGroupPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createCompGroup, isLoading: createLoading } = useCreateCompetitionGroup()

  const { data: competitionsData, isLoading: competitionsLoading } = useCompetitionsList()
  const { data: regionsData, isLoading: regionsLoading } = useRegionsList()

  const isLoading = createLoading || competitionsLoading || regionsLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('comp-groups:CREATE_PAGE_TITLE')} />
      <CreateCompetitionGroupForm
        onSubmit={createCompGroup}
        competitionsData={competitionsData || []}
        regionsData={regionsData || []}
      />
    </>
  )
}

export default CreateCompetitionGroupPage
