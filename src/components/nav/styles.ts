import { Divider, List } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledList = styled(List)(({ theme }) => ({
  color: theme.palette.background.paper,
}))

export const StyledDivider = styled(Divider)(({ theme }) => ({
  background: theme.palette.secondary.main,
}))
