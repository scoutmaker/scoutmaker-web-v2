import { TableHead, TableSortLabel } from '@mui/material'
import { SortingOrder } from '../../../types/common'
import { IHeadCell } from '../../../types/tables'
import { StyledTableCell } from './cell'
import { StyledTableRow } from './row'

interface ITableHeaderProps {
  headCells: IHeadCell[]
  sortBy: string
  order: SortingOrder
  handleSort: (id: string) => void
  collapsible?: boolean
  actions?: boolean
}

export const TableHeader = ({
  headCells,
  sortBy,
  order,
  handleSort,
  collapsible,
  actions,
}: ITableHeaderProps) => (
  <TableHead>
    <StyledTableRow>
      {collapsible ? <StyledTableCell /> : null}
      {actions ? <StyledTableCell /> : null}
      {headCells.map(({ id, label, isSortingDisabled }) => (
        <StyledTableCell key={id}>
          <TableSortLabel
            disabled={isSortingDisabled}
            active={sortBy === id}
            direction={sortBy === id ? order : 'asc'}
            onClick={() => handleSort(id)}
          >
            {label}
          </TableSortLabel>
        </StyledTableCell>
      ))}
    </StyledTableRow>
  </TableHead>
)
