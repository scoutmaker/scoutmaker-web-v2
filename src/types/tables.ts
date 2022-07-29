import { ChangeEvent } from 'react'

import { SortingOrder } from '../services/api/types'

export interface ICommonTableProps {
  page: number
  rowsPerPage: number
  sortBy: string
  order: SortingOrder
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => void
  handleChangeRowsPerPage: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handleSort: (id: string) => void
  total: number
  actions?: boolean
  collapsible?: boolean
}

export interface IHeadCell {
  id: string
  label: string
  isSortingDisabled?: boolean
}
