import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { MatchDetailsCard } from '@/modules/matches/details-card'
import { MatchDto } from '@/modules/matches/types'
import { getDisplayName } from '@/modules/matches/utils'
import { getMatchById } from '@/services/api/methods/matches'
import { ApiError } from '@/services/api/types'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TMatchPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  match: MatchDto | null
}

export const getServerSideProps = withSessionSsr<TMatchPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          match: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'matches',
    ])

    let match: MatchDto

    try {
      const matchData = await getMatchById(
        parseInt(params?.id as string),
        req.session.token,
      )
      match = matchData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          match: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        match,
      },
    }
  },
)

const MatchPage = ({ match, errorMessage, errorStatus }: TMatchPageProps) => {
  if (match) {
    return (
      <>
        <PageHeading title={getDisplayName(match.homeTeam, match.awayTeam)} />
        <MatchDetailsCard match={match} />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default MatchPage
