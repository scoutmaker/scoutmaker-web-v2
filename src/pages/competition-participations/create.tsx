import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { CreateCompetitionParticipationForm } from '@/modules/competition-participations/forms/create'
import { useCreateCompetitionParticipation } from '@/modules/competition-participations/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'comp-participations'], ['ADMIN']);

const CreateCompetitionParticipantPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const router = useRouter()
  const { t } = useTranslation()

  const { mutate: createCompetitionParticipation, isLoading: createLoading } = useCreateCompetitionParticipation()

  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()
  const { data: competitionsData, isLoading: competitionsLoading } = useCompetitionsList()
  const { data: seasonsData, isLoading: seasonsLoading } = useSeasonsList()
  const { data: groupsData, isLoading: groupsLoading } = useCompetitionGroupsList()

  const isLoading = teamsLoading || competitionsLoading || seasonsLoading || groupsLoading || createLoading

  console.log(router.query?.teamId)

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('comp-participations:CREATE_PAGE_TITLE')} />
      <CreateCompetitionParticipationForm
        onSubmit={createCompetitionParticipation}
        competitionsData={competitionsData || []}
        groupsData={groupsData || []}
        seasonsData={seasonsData || []}
        teamsData={teamsData || []}
        teamId={+(router.query?.teamId as string) || 0}
      />
    </>
  )
}

export default CreateCompetitionParticipantPage
