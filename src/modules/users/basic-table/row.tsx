import { Delete as DeleteIcon } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { UserBasicDataDto } from '../types'

interface ITableRowProps {
  data: UserBasicDataDto
  onRemoveFromOrganization?: () => void
}

export const BasicUsersTableRow = ({
  data,
  onRemoveFromOrganization,
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

  const { id, firstName, lastName } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/users/${id}`)}
    >
      <StyledTableCell padding="checkbox">
        <TableMenu
          menuAnchorEl={menuAnchorEl}
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
          onMenuClose={handleMenuClose}
        >
          {!!onRemoveFromOrganization && (
            <TableMenuItem
              icon={<DeleteIcon fontSize="small" />}
              text={t('organizations:REMOVE_FROM_ORGANIZATION')}
              onClick={() => {
                handleMenuAction(onRemoveFromOrganization)
              }}
            />
          )}
        </TableMenu>
      </StyledTableCell>
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
    </StyledTableRow>
  )
}
