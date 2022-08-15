import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

interface ITableProps extends ICommonTableProps {
  children: ReactNode
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'player', label: t('NAME') },
    { id: 'position', label: t('seasons:START_DATE') },
    { id: 'club', label: t('seasons:END_DATE'), isSortingDisabled: true },
    { id: 'status', label: t('seasons:IS_ACTIVE') },
    { id: 'scout', label: t('seasons:IS_ACTIVE') },
    { id: 'createdAt', label: t('seasons:IS_ACTIVE') },
    { id: 'description', label: t('seasons:IS_ACTIVE') },
    { id: 'reportsCount', label: t('seasons:IS_ACTIVE'), isSortingDisabled: true },
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
