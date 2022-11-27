import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { OrganizationDto } from '../types'

interface ITableRowProps {
  data: OrganizationDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const OrganizationsTableRow = ({
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

  const { id, name, createdAt, members } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/organizations/${id}`)
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
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
      <StyledTableCell>{members.length}</StyledTableCell>
    </StyledTableRow>
  )
}
