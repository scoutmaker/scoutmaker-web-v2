import { TFunction, useTranslation } from 'next-i18next'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { OrderDto, OrdersSortBy } from '../types'
import { OrdersTableRow } from './row'

interface ITableProps extends ICommonTableProps {
  data: OrderDto[]
  handleDeleteItemClick: (data: { id: string }) => void
  onAcceptOrderClick: (id: string) => void
  onRejectOrderClick: (id: string) => void
  onCloseOrderClick: (id: string) => void
}

function generateHeadCells(t: TFunction): IHeadCell<OrdersSortBy>[] {
  return [
    { id: undefined, label: t('MATCH_DATE'), isSortingDisabled: true },
    { id: undefined, label: t('MATCH'), isSortingDisabled: true },
    { id: 'player', label: t('PLAYER') },
    { id: 'position', label: t('PRIMARY_POSITION') },
    { id: 'scout', label: t('SCOUT') },
    { id: 'status', label: t('STATUS') },
    { id: 'createdAt', label: t('CREATED_AT') },
    { id: 'executionDate', label: t('orders:EXECUTION_DATE') },
  ]
}

export const OrdersTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  total,
  actions,
  data,
  handleDeleteItemClick,
  onAcceptOrderClick,
  onCloseOrderClick,
  onRejectOrderClick,
}: ITableProps) => {
  const { t } = useTranslation()

  return (
    <Table
      page={page}
      rowsPerPage={rowsPerPage}
      sortBy={sortBy}
      order={order}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleSort={handleSort}
      total={total}
      headCells={generateHeadCells(t)}
      actions={actions}
    >
      {data.map(orderData => (
        <OrdersTableRow
          onAcceptOrderClick={onAcceptOrderClick}
          onCloseOrderClick={onCloseOrderClick}
          onRejectOrderClick={onRejectOrderClick}
          key={orderData.id}
          data={orderData}
          onDeleteClick={() => handleDeleteItemClick({ id: orderData.id })}
        />
      ))}
    </Table>
  )
}
