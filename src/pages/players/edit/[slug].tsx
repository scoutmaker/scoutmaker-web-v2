import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { EditPlayerForm } from '@/components/forms/player/edit-player'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCountriesList } from '@/lib/countries'
import { usePlayerPositionsList } from '@/lib/player-positions'
import { withSessionSsr } from '@/lib/session'
import { useUpdatePlayer } from '@/modules/players/hooks'
import { PlayerDto } from '@/modules/players/types'
import { useTeamsList } from '@/modules/teams/hooks'
import { getPlayerBySlug } from '@/services/api/methods/players'
import { ApiError } from '@/types/common'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TEditPlayerPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  player: PlayerDto | null
}

export const getServerSideProps = withSessionSsr<TEditPlayerPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          player: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'players',
    ])

    let player: PlayerDto

    try {
      const playerData = await getPlayerBySlug(
        params?.slug as string,
        req.session.token,
      )
      player = playerData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          player: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        player,
      },
    }
  },
)

const EditPlayerPage = ({
  player,
  errorMessage,
  errorStatus,
}: TEditPlayerPageProps) => {
  const { t } = useTranslation()

  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: countries, isLoading: countriesLoading } = useCountriesList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()

  const { mutate: updatePlayer, isLoading: updatePlayerLoading } =
    useUpdatePlayer(player?.id || 0)

  const isLoading =
    updatePlayerLoading || positionsLoading || countriesLoading || teamsLoading

  if (player) {
    return (
      <>
        {isLoading && <Loader />}
        <PageHeading
          title={t('players:EDIT_PLAYER_PAGE_TITLE', {
            name: `${player.firstName} ${player.lastName}`,
          })}
        />
        <EditPlayerForm
          current={player}
          countriesData={countries || []}
          positionsData={positions || []}
          teamsData={teams || []}
          onSubmit={updatePlayer}
        />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default EditPlayerPage
