import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
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
import { redirectToLogin } from '@/utils/redirect-to-login'

type TEditReportPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  report: ReportDto | null
}

export const getServerSideProps = withSessionSsr<TEditReportPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          report: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'reports',
    ])

    let report: ReportDto

    try {
      const reportData = await getReportById(
        params?.id as string,
        req.session.token,
      )
      report = reportData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          report: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        report,
      },
    }
  },
)

const EditReportPage = ({
  report,
  errorMessage,
  errorStatus,
}: TEditReportPageProps) => {
  const { t } = useTranslation(['common', 'reports'])

  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: competitions, isLoading: competitionsLoading } =
    useCompetitionsList()
  const { data: competitionGroups, isLoading: competitionGroupsLoading } =
    useCompetitionGroupsList()

  const { mutate: updateReport, isLoading: updateReportLoading } =
    useUpdateReport(report?.id || '')

  const isLoading =
    positionsLoading ||
    teamsLoading ||
    competitionsLoading ||
    competitionGroupsLoading ||
    updateReportLoading

  if (report) {
    return (
      <>
        {isLoading && <Loader />}
        <PageHeading
          title={t('reports:EDIT_REPORT_PAGE_TITLE', {
            number: getDocumentNumber({
              id: report.id,
              createdAt: report.createdAt,
            }),
          })}
        />
        <EditReportForm
          current={report}
          positionsData={positions || []}
          teamsData={teams || []}
          competitionGroupsData={competitionGroups || []}
          competitionsData={competitions || []}
          onSubmit={updateReport}
        />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default EditReportPage
