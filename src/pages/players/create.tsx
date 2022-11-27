import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCountriesList } from '@/modules/countries/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { CreatePlayerForm } from '@/modules/players/forms/create'
import { useCreatePlayer } from '@/modules/players/hooks'
import { useTeamsList } from '@/modules/teams/hooks'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'players'],
  false,
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
