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
            sx={{
              '&.Mui-active': {
                color: 'info.main',
                '.MuiSvgIcon-root.MuiTableSortLabel-icon': {
                  opacity: 0.5,
                  color: 'info.main',
                },
              },
              '&:hover': {
                color: 'info.main',
              },
              '&:focus': {
                color: 'info.main',
              },
            }}
          >
            {label}
          </TableSortLabel>
        </StyledTableCell>
      ))}
    </StyledTableRow>
  </TableHead>
)
