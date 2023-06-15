import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { getPlayerFullName } from '@/modules/players/utils'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { PlayerGradeDto } from '../types'

interface ITableRowProps {
  data: PlayerGradeDto
  onEditClick: () => void
  onDeleteClick?: () => void
  actions?: boolean
}

export const PlayerGradesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  actions,
}: ITableRowProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, competition, createdAt, grade, player } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/player-grades/${id}`)
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
            onEditClick={() => handleMenuAction(onEditClick)}
          />
        </StyledTableCell>
      )}
      <CellWithLink
        label={getPlayerFullName(player)}
        href={`/players/${player.slug}`}
      />
      <StyledTableCell>{t(`player-grades:${grade}`)}</StyledTableCell>
      <StyledTableCell>{competition.name}</StyledTableCell>
      <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
    </StyledTableRow>
  )
}
