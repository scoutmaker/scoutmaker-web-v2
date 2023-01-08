import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useUser } from '@/modules/auth/hooks'
import { useCountriesList } from '@/modules/countries/hooks'
import { usePlayerPositionsList } from '@/modules/player-positions/hooks'
import { usePlayerRolesList } from '@/modules/player-roles/hooks'
import { EditPlayerForm } from '@/modules/players/forms/edit'
import { useUpdatePlayer } from '@/modules/players/hooks'
import { PlayerDto } from '@/modules/players/types'
import { shouldShowPlayerRoleField } from '@/modules/players/utils'
import { useTeamsList } from '@/modules/teams/hooks'
import { getPlayerBySlug } from '@/services/api/methods/players'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<PlayerDto>(
  ['common', 'players'],
  false,
  async (token, params) => {
    try {
      const data = await getPlayerBySlug(params?.slug as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const EditPlayerPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<PlayerDto>) => {
  const { t } = useTranslation()

  const { data: positions, isLoading: positionsLoading } =
    usePlayerPositionsList()
  const { data: countries, isLoading: countriesLoading } = useCountriesList()
  const { data: teams, isLoading: teamsLoading } = useTeamsList()
  const { data: playerRoles, isLoading: rolesLoading } = usePlayerRolesList()
  const { data: user, isLoading: userLoading } = useUser()

  const { mutate: updatePlayer, isLoading: updatePlayerLoading } =
    useUpdatePlayer(data?.id || '')

  const isLoading =
    updatePlayerLoading ||
    positionsLoading ||
    countriesLoading ||
    teamsLoading ||
    userLoading ||
    rolesLoading

  if (data) {
    return (
      <>
        {isLoading && <Loader />}
        <PageHeading
          title={t('players:EDIT_PLAYER_PAGE_TITLE', {
            name: `${data.firstName} ${data.lastName}`,
          })}
        />
        <EditPlayerForm
          current={data}
          countriesData={countries || []}
          positionsData={positions || []}
          teamsData={teams || []}
          playerRolesData={playerRoles || []}
          onSubmit={updatePlayer}
          showRoleField={shouldShowPlayerRoleField(user)}
        />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default EditPlayerPage
