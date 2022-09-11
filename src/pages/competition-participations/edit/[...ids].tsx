import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { EditCompetitionParticipationForm } from '@/modules/competition-participations/forms/edit'
import { useUpdateCompetitionParticipation } from '@/modules/competition-participations/hooks'
import { CompetitionParticipationDto } from '@/modules/competition-participations/types'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { getCompetitionParticipationById } from '@/services/api/methods/competition-participations'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps =
  withSessionSsrRole<CompetitionParticipationDto>(
    ['common', 'comp-participations'],
    ['ADMIN'],
    async (token, params) => {
      try {
        const ids = params?.ids as string[]
        const data = await getCompetitionParticipationById({
          teamId: ids[0],
          competitionId: ids[1],
          seasonId: ids[2],
          token,
        })
        return { data }
      } catch (error) {
        return {
          data: null,
          error: error as ApiError,
        }
      }
    },
  )

const EditCompetitionParticipationPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CompetitionParticipationDto>) => {
  const { t } = useTranslation()

  const { mutate: updateComp, isLoading: updateLoading } =
    useUpdateCompetitionParticipation(
      data?.team.id || '',
      data?.competition.id || '',
      data?.season.id || '',
    )

  const { data: teamsData, isLoading: teamsLoading } = useTeamsList()
  const { data: competitionsData, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: seasonsData, isLoading: seasonsLoading } = useSeasonsList()
  const { data: groupsData, isLoading: groupsLoading } =
    useCompetitionGroupsList()

  const isLoading =
    updateLoading ||
    teamsLoading ||
    competitionsLoading ||
    seasonsLoading ||
    groupsLoading

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('comp-participations:EDIT_PAGE_TITLE')} />
      <EditCompetitionParticipationForm
        current={data}
        onSubmit={updateComp}
        competitionsData={competitionsData || []}
        groupsData={groupsData || []}
        seasonsData={seasonsData || []}
        teamsData={teamsData || []}
      />
    </>
  )
}

export default EditCompetitionParticipationPage
