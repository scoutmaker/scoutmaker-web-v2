import { TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer',
    boxShadow: theme.shadows[4],
  },
}))
