import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

interface ITableProps extends ICommonTableProps {
  children: ReactNode
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'player', label: t('PLAYER') },
    { id: 'position', label: t('PRIMARY_POSITION') },
    { id: 'club', label: t('CLUB'), isSortingDisabled: true },
    { id: 'status', label: t('STATUS') },
    { id: 'scout', label: t('SCOUT') },
    { id: 'createdAt', label: t('CREATED_AT') },
    { id: 'description', label: t('DESCRIPTION') },
    { id: 'reportsCount', label: t('orders:REPORTS_COUNT'), isSortingDisabled: true },
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
  children,
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
      {children}
    </Table>
  )
}
