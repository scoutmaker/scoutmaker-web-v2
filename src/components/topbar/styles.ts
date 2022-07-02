import { Toolbar, Link, Menu } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Sports as MatchIcon } from '@mui/icons-material'

export const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}))

export const StyledTitle = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.background.paper,
}))

export const StyledButtonsContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const StyledMatchIcon = styled(MatchIcon)(({ theme }) => ({
  marginRight: theme.spacing(2),
}))

export const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: theme.palette.primary.light,
  },
}))
