import {
  TableCell,
  tableCellClasses,
  tableSortLabelClasses,
} from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableSortLabelClasses.root}`]: {
    color: 'yellow',
  },
}))
