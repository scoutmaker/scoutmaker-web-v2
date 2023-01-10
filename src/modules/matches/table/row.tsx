import {
  Assessment as ReportsIcon,
  Note as NotesIcon,
} from '@mui/icons-material'
import { Badge } from '@mui/material'
import { useRouter } from 'next/router'

import { LiveObservationIcon, VideoIcon } from '@/components/icons'
import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { MatchDto } from '@/modules/matches/types'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { getMatchResult } from '../utils'

interface IMatchesTableRowProps {
  data: MatchDto
  onEditClick: () => void
  onDeleteClick?: () => void
  actions?: boolean
}

export const MatchesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  actions,
}: IMatchesTableRowProps) => {
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
    homeTeam,
    awayTeam,
    competition,
    group,
    season,
    date,
    awayGoals,
    homeGoals,
    _count: count,
    observationType,
  } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/matches/${id}`)}
    >
      {actions && (
        <StyledTableCell padding="checkbox">
          <TableMenu
            menuAnchorEl={menuAnchorEl}
            isMenuOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            onDeleteClick={
              onDeleteClick ? () => handleMenuAction(onDeleteClick) : undefined
            }
            onEditClick={() => handleMenuAction(onEditClick)}
          />
        </StyledTableCell>
      )}
      <StyledTableCell sx={{ minWidth: 150 }}>
        {formatDate(date)}
      </StyledTableCell>
      <CellWithLink href={`/teams/${homeTeam.slug}`} label={homeTeam.name} />
      <CellWithLink href={`/teams/${awayTeam.slug}`} label={awayTeam.name} />
      <StyledTableCell>{competition.name}</StyledTableCell>
      <StyledTableCell>{group?.name}</StyledTableCell>
      <StyledTableCell>{getMatchResult(homeGoals, awayGoals)}</StyledTableCell>
      <StyledTableCell align="center">
        <Badge badgeContent={count.reports || '0'} color="secondary">
          <NotesIcon />
        </Badge>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Badge badgeContent={count.notes || '0'} color="secondary">
          <ReportsIcon />
        </Badge>
      </StyledTableCell>
      <StyledTableCell align="center">
        {(observationType === 'LIVE' || observationType === 'BOTH') && (
          <LiveObservationIcon />
        )}
        {(observationType === 'VIDEO' || observationType === 'BOTH') && (
          <VideoIcon />
        )}
      </StyledTableCell>
      <StyledTableCell>{season.name}</StyledTableCell>
    </StyledTableRow>
  )
}
