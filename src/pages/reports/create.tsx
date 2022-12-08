import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { useMatchesList } from '@/modules/matches/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayersList } from '@/modules/players/hooks'
import { useReportTemplatesList } from '@/modules/report-templates/hooks'
import { CreateReportForm } from '@/modules/reports/forms/create'
import { useCreateReport } from '@/modules/reports/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { useConfirmOnLeavePage } from '@/utils/hooks/use-confirm-leave'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'reports'],
  false,
)

const CreateReportPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { data: reportTemplates, isLoading: reportTemplatesLoading } =
    useReportTemplatesList()
  const { data: players, isLoading: playersLoading } = usePlayersList()
  const { data: matches, isLoading: matchesLoading } = useMatchesList()
  const { mutate: createReport, isLoading: createReportLoading } =
    useCreateReport()
  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: groups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()

  useConfirmOnLeavePage(t)

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />

  const isLoading =
    reportTemplatesLoading ||
    createReportLoading ||
    playersLoading ||
    matchesLoading ||
    positionsLoading ||
    teamsLoading ||
    competitionGroupsLoading ||
    competitionsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('reports:CREATE_PAGE_TITLE')} />
      <CreateReportForm
        onSubmit={createReport}
        templatesData={reportTemplates || []}
        playersData={players || []}
        matchesData={matches || []}
        positionsData={positions || []}
        teamsData={teams || []}
        competitionsData={competitions || []}
        competitionGroupsData={groups || []}
      />
    </>
  )
}

export default CreateReportPage
