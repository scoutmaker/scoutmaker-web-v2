import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

interface ITableProps extends ICommonTableProps {
  children: ReactNode
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'gender', label: t('GENDER') },
    { id: 'type', label: t('COMPETITION_TYPE') },
    { id: 'country', label: t('COUNTRY') },
    { id: 'level', label: t('LEVEL') },
    { id: 'ageCategory', label: t('COMPETITION_AGE_CATEGORY') },
    { id: 'juniorLevel', label: t('COMPETITION_JUNIOR_LEVEL') },
  ]
}

export const CompetitionsTable = ({
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
