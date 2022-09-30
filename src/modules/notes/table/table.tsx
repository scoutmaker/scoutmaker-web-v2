import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

interface IMatchesTableProps extends ICommonTableProps {
  children: ReactNode
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'favourite', label: '' },
    { id: 'player', label: t('PLAYER') },
    { id: 'positionPlayed', label: t('POSITION') },
    { id: 'percentageRating', label: t('RATING') },
    { id: 'match', label: t('MATCH') },
    { id: 'matchDate', label: t('MATCH_DATE'), isSortingDisabled: true },
    { id: 'author', label: t('AUTHOR') },
    { id: 'createdAt', label: t('CREATED_AT') },
  ]
}

export const NotesTable = ({
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
}: IMatchesTableProps) => {
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
      collapsible
    >
      {children}
    </Table>
  )
}
