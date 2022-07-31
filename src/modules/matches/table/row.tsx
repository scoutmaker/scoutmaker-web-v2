import {
  Assessment as ReportsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Note as NotesIcon,
  Tv as TvIcon,
} from '@mui/icons-material'
import { Badge, Link } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { MatchDto } from '@/modules/matches/types'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { getResult } from '../utils'

interface IMatchesTableRowProps {
  data: MatchDto
  onEditClick: () => void
  onDeleteClick: () => void
  isEditOptionEnabled: boolean
  isDeleteOptionEnabled: boolean
}

export const MatchesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
}: IMatchesTableRowProps) => {
  const router = useRouter()
  const { t } = useTranslation()

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
      <CellWithLink href={`/teams/${homeTeam.slug}`} label={homeTeam.name} />
      <CellWithLink href={`/teams/${awayTeam.slug}`} label={awayTeam.name} />
      <StyledTableCell sx={{ minWidth: 150 }}>
        {formatDate(date)}
      </StyledTableCell>
      <StyledTableCell>{competition.name}</StyledTableCell>
      <StyledTableCell>{group?.name}</StyledTableCell>
      <StyledTableCell>{season.name}</StyledTableCell>
      <StyledTableCell>{getResult(homeGoals, awayGoals)}</StyledTableCell>
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
