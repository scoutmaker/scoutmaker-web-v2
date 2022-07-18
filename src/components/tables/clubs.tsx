import { TFunction, useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { ClubsSortBy } from '../../types/clubs'
import { ICommonTableProps } from '../../types/tables'
import { Table } from './common/table'

interface IClubsTableProps extends ICommonTableProps {
  children: ReactNode
}

interface IHeadCell {
  id: ClubsSortBy
  label: string
}

function generateHeadCells(t: TFunction): IHeadCell[] {
  return [
    { id: 'name', label: t('NAME') },
    { id: 'countryId', label: t('COUNTRY') },
    { id: 'regionId', label: t('REGION') },
  ]
}

export const ClubsTable = ({
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
}: IClubsTableProps) => {
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
