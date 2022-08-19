import {
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { Badge, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { AcceptIcon, CloseIcon, NoteIcon, RejectIcon, ReportsIcon } from '@/components/icons'
import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import { getSinglePlayerRoute } from '@/modules/players/utils'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { OrderStatusChip } from '../StatusChip'
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

  const { id, player, status, scout, createdAt, description, _count: count, match } = data

  return (
    <StyledTableRow
      hover
      key={id}
      onClick={isMenuOpen ? undefined : () => router.push(`/orders/${id}`)}
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
              text={t('orders:ACCEPT')}
              onClick={() => {
                handleMenuAction(() => onAcceptOrderClick(id))
              }}
            />
            :
            <>
              <TableMenuItem
                icon={<RejectIcon fontSize="small" />}
                text={t('REJECT')}
                onClick={() => {
                  handleMenuAction(() => onRejectOrderClick(id))
                }}
              />
              <TableMenuItem
                icon={<CloseIcon fontSize="small" />}
                text={t('CLOSE')}
                onClick={() => {
                  handleMenuAction(() => onCloseOrderClick(id))
                }}
              />
            </>}
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
      <CellWithLink href={getSinglePlayerRoute(player?.slug || '')} label={`${player?.firstName} ${player?.lastName}`} />
      <StyledTableCell>{player?.primaryPosition.name}</StyledTableCell>
      <CellWithLink href={`/teams/${player?.teams[0].team.slug}`} label={player?.teams[0].team.name || ''} />
      <CellWithLink href={`/matches/${match?.id}`} label={match ? `${match?.homeTeam.name} vs ${match.awayTeam.name}` : ''} />

      <StyledTableCell><OrderStatusChip status={status} /></StyledTableCell>
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
        <Badge badgeContent={count.reports || '0'} color="secondary">
          <ReportsIcon />
        </Badge>
      </StyledTableCell>
    </StyledTableRow>
  )
}
