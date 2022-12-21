import { Box } from '@mui/material'

import { getBasicMatchName } from '@/modules/matches/utils'
import { getPlayerFullName } from '@/modules/players/utils'
import { getCompetitionDisplayName } from '@/modules/teams/details-card'
import { formatDate } from '@/utils/format-date'

import { CountCard } from '../CountCard'
import ListDataCard from '../ListDataCard'
import { DashboardDto } from '../types'

interface IProps {
  data: DashboardDto
}

const ScoutOrganizationDashboardLayout = ({ data }: IProps) => {
  // const { t } = useTranslation()
  const {
    scoutsCount,
    observerdPlayersCount,
    observedMatchesCount,
    topNotes,
    topReports,
    reportsCount,
    notesCount,
    topPlayers,
    matchesCount,
  } = data

  return (
    <>
      <CountCard title="Skauci raportujący dla klubu" count={scoutsCount} />
      <CountCard
        title="Zawodnicy z notką lub raportem subskrybowanych lig"
        count={observerdPlayersCount}
        linkTo="/players"
      />
      <CountCard
        title="Zaraportowane mecze subskrybowanych lig"
        count={observedMatchesCount}
        linkTo="/matches"
      />
      <ListDataCard
        title="Top 5 ostatnich raportów"
        items={
          topReports?.map(({ finalRating, player, createdAt, match, id }) => ({
            id,
            linksPage: 'reports',
            text: (
              <>
                {getPlayerFullName(player)}:{' '}
                <Box component="span" color="green">
                  {finalRating}
                </Box>{' '}
                ➙ {match ? getBasicMatchName(match) : ''} (
                {formatDate(createdAt)})
              </>
            ),
          })) || []
        }
      />
      <ListDataCard
        title="Top 5 ostatnich notatek"
        items={
          topNotes?.map(({ rating, player, createdAt, match, id }) => ({
            id,
            linksPage: 'notes',
            text: (
              <>
                {player ? getPlayerFullName(player) : '-'}:{' '}
                <Box component="span" color="green">
                  {rating}
                </Box>{' '}
                ➙ {match ? getBasicMatchName(match) : ''} (
                {formatDate(createdAt)})
              </>
            ),
          })) || []
        }
      />
      <ListDataCard
        title="Top 5 piłkarzy z minimum 3 wpisami do bazy"
        items={
          topPlayers?.map(
            ({ averageRating, firstName, lastName, teams, slug }) => ({
              id: slug,
              linksPage: 'players',
              text: (
                <>
                  {firstName} {lastName}:{' '}
                  <Box component="span" color="green">
                    {4 * (averageRating / 100)}
                  </Box>{' '}
                  ➙ {teams[0]?.team.name || '-'}:{' '}
                  {getCompetitionDisplayName(teams[0]?.team.competitions[0])}
                </>
              ),
            }),
          ) || []
        }
      />

      <CountCard title="Baza raportów" count={reportsCount} />
      <CountCard title="Baza notatek" count={notesCount} />
      <CountCard title="Baza meczów" count={matchesCount} />
    </>
  )
}

export default ScoutOrganizationDashboardLayout
