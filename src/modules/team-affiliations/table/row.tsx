import { Link as MUILink } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { DeleteIcon, EditIcon } from '@/components/icons'
import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { TeamAffiliationDto } from '../types'

interface ITeamAffiliationsTableRowProps {
  data: TeamAffiliationDto
  shouldDisplayPlayerName?: boolean
  onEditClick: () => void
  onDeleteClick: () => void
  isEditOptionEnabled: boolean
  isDeleteOptionEnabled: boolean
  actions?: boolean
}

export const TeamAffiliationsTableRow = ({
  data,
  shouldDisplayPlayerName,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
  actions,
}: ITeamAffiliationsTableRowProps) => {
  const { id, player, team, startDate, endDate } = data
  const router = useRouter()
  const { t } = useTranslation()

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
          >
            <TableMenuItem
              icon={<EditIcon fontSize="small" />}
              text={t('EDIT')}
              onClick={() => {
                handleMenuAction(onEditClick)
              }}
              disabled={!isEditOptionEnabled}
            />
            <TableMenuItem
              icon={<DeleteIcon fontSize="small" />}
              text={t('DELETE')}
              onClick={() => {
                handleMenuAction(onDeleteClick)
              }}
              disabled={!isDeleteOptionEnabled}
            />
          </TableMenu>
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
