import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { StyledTableCell } from '../tables/cell'
import { TableMenu } from '../tables/menu'
import { StyledTableRow } from '../tables/row'

interface IBasicTableRowProps extends ReturnType<typeof useTableMenu> {
  onEditClick?: () => void
  onDeleteClick?: () => void
  isEditOptionEnabled?: boolean
  isDeleteOptionEnabled?: boolean
  withoutTableMenu?: boolean
  href: string
  children: ReactNode
}

export const BasicTableRow = ({
  href,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
  withoutTableMenu,
  children,
  handleMenuAction,
  handleMenuClick,
  handleMenuClose,
  isMenuOpen,
  menuAnchorEl,
}: IBasicTableRowProps) => {
  const router = useRouter()

  return (
    <StyledTableRow
      hover
      onClick={isMenuOpen ? undefined : () => router.push(href)}
    >
      {!withoutTableMenu && (
        <StyledTableCell padding="checkbox">
          <TableMenu
            menuAnchorEl={menuAnchorEl}
            isMenuOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            isDeleteOptionEnabled={isDeleteOptionEnabled}
            isEditOptionEnabled={isEditOptionEnabled}
            onDeleteClick={
              onDeleteClick ? () => handleMenuAction(onDeleteClick) : undefined
            }
            onEditClick={
              onEditClick ? () => handleMenuAction(onEditClick) : undefined
            }
          />
        </StyledTableCell>
      )}
      {children}
    </StyledTableRow>
  )
}
