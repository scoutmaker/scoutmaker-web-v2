import { Drawer } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-root': {
    width: 240,

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  '& .MuiPaper-root': {
    width: 240,
    background: theme.palette.primary.main,
  },
}))
