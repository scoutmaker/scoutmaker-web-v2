import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { Table } from '@/components/tables/table'
import { ICommonTableProps, IHeadCell } from '@/types/tables'

interface IPlayersTableProps extends ICommonTableProps {
  children: ReactNode
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'lastName', label: t('LAST_NAME') },
    { id: 'firstName', label: t('FIRST_NAME') },
    { id: 'country', label: t('COUNTRY') },
    { id: 'team', label: t('TEAM') },
    { id: 'primaryPosition', label: t('PRIMARY_POSITION') },
    { id: 'yearOfBirth', label: t('YEAR_OF_BIRTH') },
    { id: 'height', label: t('HEIGHT') },
    { id: 'weight', label: t('WEIGHT') },
    { id: 'footed', label: t('FOOTED') },
    { id: 'reportsCount', label: t('REPORTS_COUNT') },
    { id: 'notesCount', label: t('NOTES_COUNT') },
  ]
}

export const PlayersTable = ({
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
}: IPlayersTableProps) => {
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
