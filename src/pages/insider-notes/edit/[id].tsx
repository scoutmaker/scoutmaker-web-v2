import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { EditInsiderNoteForm } from '@/modules/insider-notes/forms/edit'
import { useUpdateInsiderNote } from '@/modules/insider-notes/hooks'
import { InsiderNoteDto } from '@/modules/insider-notes/types'
import { usePlayersList } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { getInsiderNoteById } from '@/services/api/methods/insider-notes'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<InsiderNoteDto>(['common', 'insider-notes'], false,
  async (token, params) => {
    try {
      const data = await getInsiderNoteById(
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

const EditInsiderNotePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<InsiderNoteDto>) => {
  const { t } = useTranslation()

  const { mutate: updateInsiderNote, isLoading: updateLoading } = useUpdateInsiderNote(
    data?.id || 0,
  )

  const { data: competitionGroupsData, isLoading: competitionGroupsLoading } = useCompetitionGroupsList()
  const { data: competitionsData, isLoading: competitionsLoading } = useCompetitionsList()
  const { data: playersData, isLoading: playersLoading } = usePlayersList()
  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()

  const isLoading = updateLoading || competitionGroupsLoading || competitionsLoading || playersLoading || teamsLoading

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={t('insider-notes:EDIT_PAGE_TITLE', { nr: `${data.id}/${new Date(data.createdAt).getFullYear()}` })} />
      <EditInsiderNoteForm
        current={data}
        onSubmit={updateInsiderNote}
        competitionGroupsData={competitionGroupsData || []}
        competitionsData={competitionsData || []}
        playersData={playersData || []}
        teamsData={teamsData || []}
      />
    </>
  )
}

export default EditInsiderNotePage
