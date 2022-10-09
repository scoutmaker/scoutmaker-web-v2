import { Link as MUILink } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { TeamAffiliationDto } from '../types'

interface ITeamAffiliationsTableRowProps {
  data: TeamAffiliationDto
  shouldDisplayPlayerName?: boolean
  onEditClick?: () => void
  onDeleteClick?: () => void
  actions?: boolean
}

export const TeamAffiliationsTableRow = ({
  data,
  shouldDisplayPlayerName,
  onEditClick,
  onDeleteClick,
  actions,
}: ITeamAffiliationsTableRowProps) => {
  const { id, player, team, startDate, endDate } = data
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/team-affiliations/${id}`)
      }
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
            onEditClick={
              onEditClick ? () => handleMenuAction(onEditClick) : undefined
            }
          />
        </StyledTableCell>
      )}
      {shouldDisplayPlayerName ? (
        <StyledTableCell sx={{ minWidth: 150 }}>
          <Link href={`/players/${player.slug}`} passHref>
            <MUILink onClick={e => e.stopPropagation()}>
              {`${player.firstName} ${player.lastName}`}
            </MUILink>
          </Link>
        </StyledTableCell>
      ) : null}
      <StyledTableCell sx={{ minWidth: 150 }}>
        <Link href={`/teams/${team.slug}`} passHref>
          <MUILink onClick={e => e.stopPropagation()}>{team.name}</MUILink>
        </Link>
      </StyledTableCell>
      <StyledTableCell>{formatDate(startDate)}</StyledTableCell>
      <StyledTableCell>{endDate ? formatDate(endDate) : '-'}</StyledTableCell>
    </StyledTableRow>
  )
}
