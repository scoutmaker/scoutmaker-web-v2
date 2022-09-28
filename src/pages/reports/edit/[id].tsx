import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionGroupsList } from '@/modules/competition-groups/hooks'
import { useCompetitionsList } from '@/modules/competitions/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { EditReportForm } from '@/modules/reports/forms/edit'
import { useUpdateReport } from '@/modules/reports/hooks'
import { ReportDto } from '@/modules/reports/types'
import { useTeamsList } from '@/modules/teams/hooks'
import { getReportById } from '@/services/api/methods/reports'
import { ApiError } from '@/services/api/types'
import { getDocumentNumber } from '@/utils/get-document-number'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<ReportDto>(['common', 'reports'], false,
  async (token, params) => {
    try {
      const data = await getReportById(params?.id as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const EditReportPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ReportDto>) => {
  const { t } = useTranslation(['common', 'reports'])

  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()

  const { mutate: updateReport, isLoading: updateReportLoading } =
    useUpdateReport(data?.id || '')

  const isLoading =
    positionsLoading ||
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    updateReportLoading

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={t('reports:EDIT_REPORT_PAGE_TITLE', {
          number: getDocumentNumber({
            docNumber: data.docNumber,
            createdAt: data.createdAt,
          }),
        })}
      />
      <EditReportForm
        current={data}
        positionsData={positions || []}
        teamsData={teams || []}
        competitionGroupsData={competitionGroups || []}
        competitionsData={competitions || []}
        onSubmit={updateReport}
      />
    </>
  )
}

export default EditReportPage
