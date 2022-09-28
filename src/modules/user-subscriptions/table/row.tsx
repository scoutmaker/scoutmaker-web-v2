import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { UserSubscriptionDto } from '../types'

interface ITableRowProps {
  data: UserSubscriptionDto
  onEditClick: () => void
  onDeleteClick: () => void
  isEditOptionEnabled: boolean
  isDeleteOptionEnabled: boolean
}

export const UserSubscriptionsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
}: ITableRowProps) => {
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, endDate, startDate, user } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/user-subscriptions/${id}`)
      }
    >
      <StyledTableCell padding="checkbox">
        <TableMenu
          menuAnchorEl={menuAnchorEl}
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
          onMenuClose={handleMenuClose}
          isDeleteOptionEnabled={isDeleteOptionEnabled}
          isEditOptionEnabled={isEditOptionEnabled}
          onDeleteClick={() => handleMenuAction(onDeleteClick)}
          onEditClick={() => handleMenuAction(onEditClick)}
        />
      </StyledTableCell>
      <CellWithLink
        label={`${user.firstName} ${user.lastName}`}
        href={`/users/${user.id}`}
      />
      <StyledTableCell>{formatDate(startDate)}</StyledTableCell>
      <StyledTableCell>{formatDate(endDate)}</StyledTableCell>
    </StyledTableRow>
  )
}
