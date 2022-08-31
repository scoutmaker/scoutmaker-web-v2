import { Drawer } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },

  '& .MuiPaper-root': {
    background: theme.palette.primary.main,
  },
}))
