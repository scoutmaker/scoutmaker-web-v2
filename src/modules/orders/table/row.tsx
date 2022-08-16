import {
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { Badge, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { AcceptIcon, CloseIcon, NoteIcon, RejectIcon, ReportsIcon } from '@/components/icons'
import { StyledTableCell } from '@/components/tables/cell'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { OrderDto } from '../types'

interface ITableRowProps {
  data: OrderDto
  onDeleteClick: () => void
  isDeleteOptionEnabled: boolean
  onAcceptOrderClick: (id: number) => void
  onRejectOrderClick: (id: number) => void
  onCloseOrderClick: (id: number) => void
}

export const OrdersTableRow = ({
  data,
  onDeleteClick,
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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { id, player, status, scout, createdAt, description, _count, } = data

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
          {status === 'OPEN' ?
            <TableMenuItem
              icon={<AcceptIcon fontSize="small" />}
              text={t('orders:ACCEPT')} // ADD_TRANS
              onClick={() => {
                handleMenuAction(() => onAcceptOrderClick(id))
              }}
            />
            :
            <>
              <TableMenuItem
                icon={<RejectIcon fontSize="small" />}
                text={t('REJECT')} // ADD_TRANS
                onClick={() => {
                  handleMenuAction(() => onRejectOrderClick(id))
                }}
              />
              <TableMenuItem
                icon={<CloseIcon fontSize="small" />}
                text={t('CLOSE')} // ADD_TRANS
                onClick={() => {
                  handleMenuAction(() => onCloseOrderClick(id))
                }}
              />
            </>}
          {/* <TableMenuItem
            icon={<EditIcon fontSize="small" />}
            text={t('EDIT')}
            onClick={() => {
              handleMenuAction(onEditClick)
            }}
            disabled={!isEditOptionEnabled}
          /> */}
          <TableMenuItem
            icon={<DeleteIcon fontSize="small" />}
            text={t('DELETE')}
            onClick={() => {
              handleMenuAction(onDeleteClick)
            }}
            disabled={!isDeleteOptionEnabled}
          />
        </TableMenu>
      </StyledTableCell>
      <StyledTableCell>{`${player?.firstName} ${player?.lastName}`}</StyledTableCell>
      <StyledTableCell>{player?.primaryPosition.name}</StyledTableCell>
      <StyledTableCell>{player?.teams[0].team.name}</StyledTableCell>
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
        <Badge badgeContent={_count.reports} color="secondary">
          <ReportsIcon />
        </Badge>
      </StyledTableCell>
    </StyledTableRow>
  )
}
