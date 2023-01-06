import { Box, Typography } from '@mui/material'

import { PlayerSuperBasicDataDto } from '@/modules/players/types'
import { getCompetitionDisplayName } from '@/modules/teams/details-card'
import { calculateRating } from '@/utils/calculate-rating'
import { formatDate } from '@/utils/format-date'

import { CountCard } from '../CountCard'
import ListDataCard from '../ListDataCard'
import { DashboardDto } from '../types'

interface IProps {
  data: DashboardDto
}

const getPlayerShortName = (player: PlayerSuperBasicDataDto) =>
  `${player.firstName.charAt(0)}. ${player.lastName}`

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
        linkTo="/players?hasAnyObservation=true"
      />
      <CountCard
        title="Zaraportowane mecze subskrybowanych lig"
        count={observedMatchesCount}
        linkTo="/matches"
      />
      <ListDataCard
        title="Top 5 ostatnich raportów"
        items={
          topReports?.map(({ player, createdAt, match, id }) => ({
            id,
            linksPage: 'reports',
            text: (
              <>
                {formatDate(createdAt, 'dd.MM.yyyy')}r.{' '}
                <Typography color="textSecondary" component="span">
                  {getPlayerShortName(player)}
                </Typography>{' '}
                {match ? `vs ${match.homeTeam.name}` : ''}
              </>
            ),
          })) || []
        }
      />
      <ListDataCard
        title="Top 5 ostatnich notatek"
        items={
          topNotes?.map(({ player, createdAt, match, id }) => ({
            id,
            linksPage: 'notes',
            text: (
              <>
                {formatDate(createdAt, 'dd.MM.yyyy')}r.{' '}
                <Typography color="textSecondary" component="span">
                  {player ? getPlayerShortName(player) : '-'}
                </Typography>{' '}
                {match ? `vs ${match.homeTeam.name}` : ''}
              </>
            ),
          })) || []
        }
      />
      <ListDataCard
        title="Top 5 piłkarzy z min. 3 obserwacjami"
        items={
          topPlayers?.map(
            ({
              averagePrecentageRating,
              firstName,
              lastName,
              teams,
              slug,
            }) => ({
              id: slug,
              linksPage: 'players',
              text: (
                <>
                  {firstName} {lastName}:{' '}
                  <Box component="span" color="green">
                    {calculateRating(averagePrecentageRating)}
                  </Box>{' '}
                  ➙ {teams[0]?.team.name || '-'}:{' '}
                  {getCompetitionDisplayName(teams[0]?.team.competitions[0])}
                </>
              ),
            }),
          ) || []
        }
      />

      <CountCard title="Baza raportów" count={reportsCount} linkTo="/reports" />
      <CountCard title="Baza notatek" count={notesCount} linkTo="/notes" />
      <CountCard title="Baza meczów" count={matchesCount} linkTo="/matches" />
    </>
  )
}

export default ScoutOrganizationDashboardLayout
