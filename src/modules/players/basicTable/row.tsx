import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { PlayerSuperBasicDataDto } from '../types'

interface IPlayersBasicTableRowProps {
  data: PlayerSuperBasicDataDto
  onEditClick: () => void
  onDeleteClick?: () => void
  actions?: boolean
}

export const PlayersBasicTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  actions,
}: IPlayersBasicTableRowProps) => {
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, slug, firstName, lastName } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/players/${slug}`)}
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
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
    </StyledTableRow>
  )
}
