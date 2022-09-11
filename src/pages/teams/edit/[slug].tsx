import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { useClubsList } from '@/modules/clubs/hooks'
import { EditTeamForm } from '@/modules/teams/forms/edit'
import { useUpdateTeam } from '@/modules/teams/hooks'
import { TeamDto } from '@/modules/teams/types'
import { getTeamBySlug } from '@/services/api/methods/teams'
import { ApiError } from '@/services/api/types'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TEditTeamPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  team: TeamDto | null
}

export const getServerSideProps = withSessionSsr<TEditTeamPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          team: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'teams',
    ])

    let team: TeamDto

    try {
      const teamData = await getTeamBySlug(
        params?.slug as string,
        req.session.token,
      )
      team = teamData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          team: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        team,
      },
    }
  },
)

const EditTeamPage = ({
  team,
  errorMessage,
  errorStatus,
}: TEditTeamPageProps) => {
  const { t } = useTranslation()

  const { data: clubs, isLoading: clubsLoading } = useClubsList()
  const { mutate: updateTeam, isLoading: updateTeamLoading } = useUpdateTeam(
    team?.id || '',
  )

  if (team) {
    return (
      <>
        {(clubsLoading || updateTeamLoading) && <Loader />}
        <PageHeading
          title={t('teams:EDIT_TEAM_PAGE_TITLE', { name: team.name })}
        />
        <EditTeamForm
          current={team}
          clubsData={clubs || []}
          onSubmit={updateTeam}
        />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default EditTeamPage
