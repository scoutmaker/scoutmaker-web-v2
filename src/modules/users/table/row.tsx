import { WorkspacePremium as RoleIcon } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { useTableMenu } from '@/utils/hooks/use-table-menu'
import { isAdmin } from '@/utils/user-roles'

import { UserDto } from '../types'

interface ITableRowProps {
  data: UserDto
  onSetRole: (arg: { id: string; role: UserDto['role'] }) => void
}

export const UsersTableRow = ({ data, onSetRole }: ITableRowProps) => {
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
            {role !== 'PLAYMAKER_SCOUT_MANAGER' && (
              <TableMenuItem
                icon={<RoleIcon fontSize="small" />}
                text={t('users:SET_ROLE', { role: 'PLAYMAKER_SCOUT_MANAGER' })}
                onClick={() => {
                  handleMenuAction(() =>
                    onSetRole({ id, role: 'PLAYMAKER_SCOUT_MANAGER' }),
                  )
                }}
              />
            )}
            {role !== 'PLAYMAKER_SCOUT' && (
              <TableMenuItem
                icon={<RoleIcon fontSize="small" />}
                text={t('users:SET_ROLE', { role: 'PLAYMAKER_SCOUT' })}
                onClick={() => {
                  handleMenuAction(() =>
                    onSetRole({ id, role: 'PLAYMAKER_SCOUT' }),
                  )
                }}
              />
            )}
            {role !== 'SCOUT' && (
              <TableMenuItem
                icon={<RoleIcon fontSize="small" />}
                text={t('users:SET_ROLE', { role: 'SCOUT' })}
                onClick={() => {
                  handleMenuAction(() => onSetRole({ id, role: 'SCOUT' }))
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
