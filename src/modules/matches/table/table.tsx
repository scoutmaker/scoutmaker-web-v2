import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

interface IMatchesTableProps extends ICommonTableProps {
  children: ReactNode
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'homeTeam', label: t('HOME_TEAM') },
    { id: 'awayTeam', label: t('AWAY_TEAM') },
    { id: 'date', label: t('DATE') },
    { id: 'competition', label: t('COMPETITION') },
    { id: 'group', label: t('COMPETITION_GROUP') },
    { id: 'season', label: t('SEASON') },
    { id: 'result', label: t('RESULT'), isSortingDisabled: true },
    { id: 'videoUrl', label: t('VIDEO') },
    { id: 'reportsCount', label: t('REPORTS_COUNT') },
    { id: 'notesCount', label: t('NOTES_COUNT') },
  ]
}

export const MatchesTable = ({
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
    >
      {children}
    </Table>
  )
}
