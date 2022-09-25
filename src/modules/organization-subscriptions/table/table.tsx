import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

interface ITableProps extends ICommonTableProps {
  children: ReactNode
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'organization', label: t('ORGANIZATION') },
    { id: 'startDate', label: t('organization-subs:START_DATE') },
    { id: 'endDate', label: t('organization-subs:END_DATE') },
  ]
}

export const OrganizationSubscriptionsTable = ({
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
