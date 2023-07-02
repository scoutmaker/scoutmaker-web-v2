import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { AcceptIcon, CloseIcon, RejectIcon } from '@/components/icons'
import { StyledTableCell } from '@/components/tables/cell'
import { CellWithLink } from '@/components/tables/cell-with-link'
import { TableMenu } from '@/components/tables/menu'
import { TableMenuItem } from '@/components/tables/menu-item'
import { StyledTableRow } from '@/components/tables/row'
import {
  getMatchDisplayName,
  getSingleMatchRoute,
} from '@/modules/matches/utils'
import { getSinglePlayerRoute } from '@/modules/players/utils'
import { formatDate } from '@/utils/format-date'
import { useTableMenu } from '@/utils/hooks/use-table-menu'

import { OrderStatusChip } from '../StatusChip'
import { OrderDto } from '../types'

interface ITableRowProps {
  data: OrderDto
  onDeleteClick: () => void
  onAcceptOrderClick: (id: string) => void
  onRejectOrderClick: (id: string) => void
  onCloseOrderClick: (id: string) => void
}

export const OrdersTableRow = ({
  data,
  onDeleteClick,
  onAcceptOrderClick,
  onRejectOrderClick,
  onCloseOrderClick,
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

  const { id, player, status, scout, createdAt, executionDate, match } = data

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
          onDeleteClick={() => handleMenuAction(onDeleteClick)}
        >
          {status === 'OPEN' ? (
            <TableMenuItem
              icon={<AcceptIcon fontSize="small" />}
              text={t('orders:ACCEPT')}
              onClick={() => {
                handleMenuAction(() => onAcceptOrderClick(id))
              }}
            />
          ) : (
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
            </>
          )}
        </TableMenu>
      </StyledTableCell>
      <StyledTableCell>{match ? formatDate(match.date) : '-'}</StyledTableCell>
      {match ? (
        <CellWithLink
          href={getSingleMatchRoute(match.id)}
          label={getMatchDisplayName({
            homeTeamName: match.homeTeam.name,
            awayTeamName: match.awayTeam.name,
            date: match.date,
          })}
        />
      ) : (
        <StyledTableCell>-</StyledTableCell>
      )}
      {player ? (
        <CellWithLink
          href={getSinglePlayerRoute(player?.slug || '')}
          label={player ? `${player?.firstName} ${player?.lastName}` : ''}
        />
      ) : (
        <StyledTableCell>-</StyledTableCell>
      )}
      <StyledTableCell>{player?.primaryPosition.name || '-'}</StyledTableCell>
      <StyledTableCell>
        {scout ? `${scout.firstName} ${scout.lastName}` : '-'}
      </StyledTableCell>
      <StyledTableCell>
        <OrderStatusChip status={status} />
      </StyledTableCell>
      <StyledTableCell>{formatDate(createdAt)}</StyledTableCell>
      <StyledTableCell>
        {executionDate ? formatDate(executionDate) : '-'}
      </StyledTableCell>
    </StyledTableRow>
  )
}
