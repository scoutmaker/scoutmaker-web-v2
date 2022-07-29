import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { useCountriesList } from '@/modules/countries/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { CreatePlayerForm } from '@/modules/players/forms/create'
import { useCreatePlayer } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { redirectToLogin } from '@/utils/redirect-to-login'

export const getServerSideProps = withSessionSsr(
  async ({ req, res, locale }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'players',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const CreatePlayerPage = () => {
  const { t } = useTranslation()

  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: countries, isLoading: countriesLoading } = useCountriesList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()

  const { mutate: createPlayer, isLoading: createPlayersLoading } =
    useCreatePlayer()

  const isLoading =
    createPlayersLoading || positionsLoading || countriesLoading || teamsLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('players:CREATE_PLAYER_PAGE_TITLE')} />
      <CreatePlayerForm
        positionsData={positions || []}
        countriesData={countries || []}
        teamsData={teams || []}
        onSubmit={createPlayer}
      />
    </>
  )
}

export default CreatePlayerPage