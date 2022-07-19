import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { Table } from './common/table'

interface ITeamsTableProps extends ICommonTableProps {
  children: ReactNode
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'clubId', label: t('CLUB') },
    { id: 'competition', label: t('COMPETITION'), isSortingDisabled: true },
    {
      id: 'competitionGroup',
      label: t('COMPETITION_GROUP'),
      isSortingDisabled: true,
    },
  ]
}

export const TeamsTable = ({
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
}: ITeamsTableProps) => {
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
