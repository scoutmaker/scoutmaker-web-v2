import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { StyledTableRow } from '@/components/tables/row'
import {
  getPlayerFullName,
  getSinglePlayerRoute,
} from '@/modules/players/utils'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { UserPlayerAclDto } from '../types'

interface ITableRowProps {
  data: UserPlayerAclDto
  onEditClick: () => void
  onDeleteClick: () => void
}

export const UserPlayerAclTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
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
      <CellWithLink
        href={`/users/${user.id}`}
        label={`${user.firstName} ${user.lastName} (${user.email})`}
      />
      <CellWithLink
        href={getSinglePlayerRoute(player.slug)}
        label={getPlayerFullName(player)}
      />
      <StyledTableCell>{t(`permissions:${permissionLevel}`)}</StyledTableCell>
      <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
    </StyledTableRow>
  )
}
