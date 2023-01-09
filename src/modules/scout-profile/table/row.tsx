import { Badge } from '@mui/material'
import { useRouter } from 'next/router'

import { NotesIcon, ReportsIcon } from '@/components/icons'
import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import { UserDto } from '@/modules/users/types'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'
import { isAdmin } from '@/utils/user-roles'

interface ITableRowProps {
  data: UserDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const ScoutProfilesRow = ({
  data,
  onEditClick,
  onDeleteClick,
}: ITableRowProps) => {
  const router = useRouter()

  const { menuAnchorEl, isMenuOpen, handleMenuClick, handleMenuClose } =
    useTableMenu()

  const {
    id,
    firstName,
    lastName,
    email,
    role,
    region,
    city,
    _count: count,
    profile,
  } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={
        isMenuOpen ? undefined : () => router.push(`/scout-profiles/${id}`)
      }
    >
      <StyledTableCell padding="checkbox">
        {!isAdmin(data) && (
          <TableMenu
            menuAnchorEl={menuAnchorEl}
            isMenuOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        )}
      </StyledTableCell>
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
      <StyledTableCell>{email}</StyledTableCell>
      <StyledTableCell>{role}</StyledTableCell>
      <StyledTableCell>{region?.name}</StyledTableCell>
      <StyledTableCell>{city || '-'}</StyledTableCell>
      <StyledTableCell>
        {profile?.cooperationStartDate
          ? formatDate(profile.cooperationStartDate)
          : '-'}
      </StyledTableCell>
      <StyledTableCell>{profile?.rating || '-'}</StyledTableCell>
      <StyledTableCell>{profile?.description || '-'}</StyledTableCell>
      <StyledTableCell align="center">
        <Badge badgeContent={count.createdNotes || '0'} color="secondary">
          <NotesIcon />
        </Badge>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Badge badgeContent={count.createdReports || '0'} color="secondary">
          <ReportsIcon />
        </Badge>
      </StyledTableCell>
    </StyledTableRow>
  )
}
