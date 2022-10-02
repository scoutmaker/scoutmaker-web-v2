/* eslint-disable react/function-component-definition */
// ^ auto-fix gives me another error/warning it just doesn't like my solution😭
import { ReactNode } from 'react'

import { ICommonTableProps, IHeadCell } from '@/types/tables'

import { Table } from '../tables/table'

interface ITableExportedProps extends ICommonTableProps {
  children: ReactNode
}

export const generateBasicTable =
  (headCells: IHeadCell[]) =>
  ({
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
  }: ITableExportedProps) =>
    (
      <Table
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={total}
        actions={actions}
        headCells={headCells}
      >
        {children}
      </Table>
    )
