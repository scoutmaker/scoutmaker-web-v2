import {
  ArrowDownward as DownIcon,
  ArrowUpward as UpIcon,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { useTableMenu } from '@/utils/hooks/use-table-menu'
import { isAdmin, isPlaymakerScout } from '@/utils/user-roles'

import { UserDto } from '../types'

interface ITableRowProps {
  data: UserDto
  onSetScoutClick: () => void
  onSetPlaymakerScoutClick: () => void
}

export const UsersTableRow = ({
  data,
  onSetScoutClick,
  onSetPlaymakerScoutClick,
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

  const { id, firstName, lastName, email, role, region, city } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/users/${id}`)}
    >
      <StyledTableCell padding="checkbox">
        {!isAdmin(data) && (
          <TableMenu
            menuAnchorEl={menuAnchorEl}
            isMenuOpen={isMenuOpen}
            onMenuClick={handleMenuClick}
            onMenuClose={handleMenuClose}
          >
            {isPlaymakerScout(data) ? (
              <TableMenuItem
                icon={<DownIcon fontSize="small" />}
                text={t('users:SET_SCOUT_ROLE')}
                onClick={() => {
                  handleMenuAction(onSetScoutClick)
                }}
              />
            ) : (
              <TableMenuItem
                icon={<UpIcon fontSize="small" />}
                text={t('users:SET_PLAYMAKER_SCOUT_ROLE')}
                onClick={() => {
                  handleMenuAction(onSetPlaymakerScoutClick)
                }}
              />
            )}
          </TableMenu>
        )}
      </StyledTableCell>
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
      <StyledTableCell>{email}</StyledTableCell>
      <StyledTableCell>{role}</StyledTableCell>
      <StyledTableCell>{region?.name}</StyledTableCell>
      <StyledTableCell>{city || '-'}</StyledTableCell>
    </StyledTableRow>
  )
}
