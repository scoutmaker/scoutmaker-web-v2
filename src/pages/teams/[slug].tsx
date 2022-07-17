import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/lib/session'
import { ApiError } from '@/types/common'
import { redirectToLogin } from '@/utils/redirect-to-login'
import { TeamDto } from '@/types/teams'
import { getTeamBySlug } from '@/lib/teams'
import { TeamDetailsCard } from '@/components/details-cards/team'

type TTeamPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  team: TeamDto | null
}

export const getServerSideProps = withSessionSsr<TTeamPageProps>(
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

const TeamPage = ({ team, errorMessage, errorStatus }: TTeamPageProps) => {
  if (team) {
    return (
      <>
        <PageHeading title={team.name} />
        <TeamDetailsCard team={team} />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default TeamPage
