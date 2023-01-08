import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { PlayerRoleDto } from '../types'

interface ITableRowProps {
  data: PlayerRoleDto
  onEditClick: () => void
  onDeleteClick: () => void
  showTableMenu: boolean
}

export const PlayerRolesTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  showTableMenu,
}: ITableRowProps) => {
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, name, altName, positionType } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/player-roles/${id}`)
      }
    >
      <StyledTableCell padding="checkbox">
        {showTableMenu && (
          <TableMenu
            menuAnchorEl={menuAnchorEl}
            isMenuOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            onDeleteClick={() => handleMenuAction(onDeleteClick)}
            onEditClick={() => handleMenuAction(onEditClick)}
          />
        )}
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{altName}</StyledTableCell>
      <StyledTableCell>
        {positionType ? positionType.name : '-'}
      </StyledTableCell>
    </StyledTableRow>
  )
}
