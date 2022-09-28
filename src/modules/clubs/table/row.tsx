import { useRouter } from 'next/router'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { ClubDto } from '@/modules/clubs/types'
import { getFlagEmoji } from '@/utils/get-flag-emoji'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

interface IClubsTableRowProps {
  data: ClubDto
  onEditClick: () => void
  onDeleteClick: () => void
  isEditOptionEnabled: boolean
  isDeleteOptionEnabled: boolean
}

export const ClubsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
}: IClubsTableRowProps) => {
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, name, slug, region, country } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/clubs/${slug}`)}
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
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{`${getFlagEmoji(country.code)} ${
        country.name
      }`}</StyledTableCell>
      <StyledTableCell>{region?.name}</StyledTableCell>
    </StyledTableRow>
  )
}
