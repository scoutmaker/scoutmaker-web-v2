import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { getMatchDisplayName } from '@/modules/matches/utils'
import { getPlayerFullName } from '@/modules/players/utils'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { PlayerStatsDto } from '../types'

interface ITableRowProps {
  data: PlayerStatsDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const PlayerStatsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
}: ITableRowProps) => {
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const {
    id,
    assists,
    goals,
    match,
    minutesPlayed,
    player,
    redCards,
    yellowCards,
  } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/player-stats/${id}`)
      }
    >
      <StyledTableCell padding="checkbox">
        <TableMenu
          menuAnchorEl={menuAnchorEl}
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
          onMenuClose={handleMenuClose}
          onDeleteClick={() => handleMenuAction(onDeleteClick)}
          onEditClick={() => handleMenuAction(onEditClick)}
        />
      </StyledTableCell>
      <StyledTableCell>{getPlayerFullName(player)}</StyledTableCell>
      <StyledTableCell>
        {getMatchDisplayName({
          awayTeamName: match.awayTeam.name,
          homeTeamName: match.homeTeam.name,
          competitionName: match.competition.name,
          date: match.date,
        })}
      </StyledTableCell>
      <StyledTableCell>{goals}</StyledTableCell>
      <StyledTableCell>{assists}</StyledTableCell>
      <StyledTableCell>{minutesPlayed}</StyledTableCell>
      <StyledTableCell>{yellowCards}</StyledTableCell>
      <StyledTableCell>{redCards}</StyledTableCell>
    </StyledTableRow>
  )
}
