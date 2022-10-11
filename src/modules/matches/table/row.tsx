import {
  Assessment as ReportsIcon,
  Note as NotesIcon,
  Tv as TvIcon,
} from '@mui/icons-material'
import { Badge, Link } from '@mui/material'
import { useRouter } from 'next/router'

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
  onDeleteClick: () => void
}

export const MatchesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
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
    videoUrl,
    _count: count,
  } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/matches/${id}`)}
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
      <CellWithLink href={`/teams/${homeTeam.slug}`} label={homeTeam.name} />
      <CellWithLink href={`/teams/${awayTeam.slug}`} label={awayTeam.name} />
      <StyledTableCell sx={{ minWidth: 150 }}>
        {formatDate(date)}
      </StyledTableCell>
      <StyledTableCell>{competition.name}</StyledTableCell>
      <StyledTableCell>{group?.name}</StyledTableCell>
      <StyledTableCell>{season.name}</StyledTableCell>
      <StyledTableCell>{getMatchResult(homeGoals, awayGoals)}</StyledTableCell>
      <StyledTableCell align="center">
        {videoUrl ? (
          <Link
            href={videoUrl}
            onClick={e => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TvIcon />
          </Link>
        ) : null}
      </StyledTableCell>
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
    </StyledTableRow>
  )
}
