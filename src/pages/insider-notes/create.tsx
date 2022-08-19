import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { CreateInsiderNoteForm } from '@/modules/insider-notes/forms/create'
import { useCreateInsiderNote } from '@/modules/insider-notes/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'insider-notes'], false)

const CreateInsiderNotePage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createInsiderNote, isLoading: createLoading } = useCreateInsiderNote()

  const { data: competitionGroupsData, isLoading: competitionGroupsLoading } = useCompetitionGroupsList()
  const { data: competitionsData, isLoading: competitionsLoading } = useCompetitionsList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const isLoading =
    createLoading || competitionGroupsLoading || competitionsLoading || playersLoading || teamsLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('insider-notes:CREATE_PAGE_TITLE')}
      />
      <CreateInsiderNoteForm
        competitionGroupsData={competitionGroupsData || []}
        competitionsData={competitionsData || []}
        playersData={playersData || []}
        teamsData={teamsData || []}
        onSubmit={createInsiderNote}
      />
    </>
  )
}

export default CreateInsiderNotePage
