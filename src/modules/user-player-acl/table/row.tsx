import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { getPlayerFullName } from '@/modules/players/utils'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { UserPlayerAceDto } from '../types'

interface ITableRowProps {
  data: UserPlayerAceDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const UserPlayerAceTableRow = ({
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

  const { id, player, user, permissionLevel, createdAt } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/user-player-acl/${id}`)
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
      <StyledTableCell>{`${user.firstName} ${user.lastName} (${user.email})`}</StyledTableCell>
      <StyledTableCell>{getPlayerFullName(player)}</StyledTableCell>
      <StyledTableCell>{permissionLevel}</StyledTableCell>
      <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
    </StyledTableRow>
  )
}
