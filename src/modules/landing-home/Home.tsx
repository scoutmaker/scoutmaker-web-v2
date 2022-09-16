import { Button, styled, Typography } from "@mui/material";

import backgroundImg from '@/assets/scouting-background.png'


export const WrapperImg = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImg.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',

  [theme.breakpoints.down('lg')]: {
    backgroundPosition: 'left center',
  },
}))

export const MainContainer = styled('main')(({ theme }) => ({
  minHeight: 'calc(100vh - 174px)',
  paddingTop: 200,
  maxWidth: 1200,
  margin: '0 auto',

  [theme.breakpoints.down('lg')]: {
    paddingTop: 200,
  },

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    paddingTop: 150,
  },

  [theme.breakpoints.down('sm')]: {
    paddingTop: 120,
  },
}))

export const FlexWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
}))

export const HeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: 64,
  paddingRight: theme.spacing(4),

  [theme.breakpoints.down('lg')]: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    paddingRight: 0,
  },

  [theme.breakpoints.down('md')]: {
    fontSize: 48,
  },
}))



export const ButtonsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}))

export const GoToAppContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(6),

  [theme.breakpoints.down(700)]: {
    padding: theme.spacing(6, 0),
    justifyContent: 'stretch',
  },
}))

export const GoToAppButton = styled(Button)(({ theme }) => ({
  fontSize: 16,
  fontWeight: theme.typography.fontWeightBold,
  background: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  padding: theme.spacing(2, 6),

  '&:hover': {
    color: theme.palette.primary.contrastText,
  },

  [theme.breakpoints.down(700)]: {
    flex: 1
  },
}))
