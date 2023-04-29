import { Badge } from '@mui/material'
import { useRouter } from 'next/router'

import { TeamsIcon } from '@/components/icons'
import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { ClubDto } from '@/modules/clubs/types'
import { FlagEmoji } from '@/utils/get-flag-emoji'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

interface IClubsTableRowProps {
  data: ClubDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const ClubsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
}: IClubsTableRowProps) => {
  const router = useRouter()

  const {
    menuAnchorEl,
    isMenuOpen,
    handleMenuClick,
    handleMenuClose,
    handleMenuAction,
  } = useTableMenu()

  const { id, name, slug, region, country, _count: count } = data

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
          onDeleteClick={() => handleMenuAction(onDeleteClick)}
          onEditClick={() => handleMenuAction(onEditClick)}
        />
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>
        <FlagEmoji code={country.code} /> {country.name}
      </StyledTableCell>
      <StyledTableCell>{region?.name}</StyledTableCell>
      <StyledTableCell>
        <Badge badgeContent={count.teams || '0'} color="secondary">
          <TeamsIcon />
        </Badge>
      </StyledTableCell>
    </StyledTableRow>
  )
}
