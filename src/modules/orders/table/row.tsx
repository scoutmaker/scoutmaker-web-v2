import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import { Badge, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { NoteIcon, ReportsIcon } from '@/components/icons'
import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { OrderDto } from '../types'

interface ITableRowProps {
  data: OrderDto
  onEditClick: () => void
  onDeleteClick: () => void
  isEditOptionEnabled: boolean
  isDeleteOptionEnabled: boolean
  onAcceptOrderClick: (id: number) => void
  onRejectOrderClick: (id: number) => void
  onCloseOrderClick: (id: number) => void
}

export const SeasonsTableRow = ({
  data,
  onEditClick,
  onDeleteClick,
  isEditOptionEnabled,
  isDeleteOptionEnabled,
  onAcceptOrderClick,
  onRejectOrderClick,
  onCloseOrderClick
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

  const { id, player, status, scout, createdAt, description } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/seasons/${id}`)}
    >
      <StyledTableCell padding="checkbox">
        <TableMenu
          menuAnchorEl={menuAnchorEl}
          isMenuOpen={isMenuOpen}
          onMenuClick={handleMenuClick}
          onMenuClose={handleMenuClose}
        >
          <TableMenuItem
            icon={<EditIcon fontSize="small" />}
            text={t('EDIT')}
            onClick={() => {
              handleMenuAction(onEditClick)
            }}
            disabled={!isEditOptionEnabled}
          />
          <TableMenuItem
            icon={<DeleteIcon fontSize="small" />}
            text={t('DELETE')}
            onClick={() => {
              handleMenuAction(onDeleteClick)
            }}
            disabled={!isDeleteOptionEnabled}
          />
          {/* add accept/reject/close */}
        </TableMenu>
      </StyledTableCell>
      <StyledTableCell>{`${player?.firstName} ${player?.lastName}`}</StyledTableCell>
      <StyledTableCell>{player?.primaryPosition.name}</StyledTableCell>
      <StyledTableCell>to add club</StyledTableCell>
      <StyledTableCell>{status}</StyledTableCell>
      <StyledTableCell>{scout ? `${scout.firstName} ${scout.lastName}` : ''}</StyledTableCell>
      <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
      <StyledTableCell padding="checkbox" align="center">
        {!!description && (
          <Tooltip title={description}>
            <NoteIcon />
          </Tooltip>
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Badge badgeContent={0} color="secondary">
          <ReportsIcon />
        </Badge>
      </StyledTableCell>
    </StyledTableRow>
  )
}
