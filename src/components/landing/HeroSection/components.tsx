import { styled, Typography } from "@mui/material";

export const Container = styled("section", {
  shouldForwardProp: (prop) => prop !== "backgroundImage",
})<{ backgroundImage?: string }>(({ theme, backgroundImage }) => ({
  minHeight: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center center',

  [theme.breakpoints.down('lg')]: {
    backgroundPosition: 'left center',
  },
}));

export const InnerContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  color: theme.palette.primary.contrastText,
  minHeight: '100vh',

  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
}))

export const ImageContainer = styled('div')(({ theme }) => ({
  width: '40%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  flex: 0.8,
  marginTop: 'auto',

  [theme.breakpoints.down('lg')]: {
    order: 2,
  },
}))

export const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  fontWeight: theme.typography.fontWeightBold,

  '& em': {
    color: theme.palette.secondary.main,
    fontStyle: 'normal',
  },

  [theme.breakpoints.down('lg')]: {
    textAlign: 'center',
  },
}))

export const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 36,
  margin: '0 auto',
})

export const ButtonContainer = styled('div')(({ theme }) => ({
  alignSelf: 'flex-end',

  [theme.breakpoints.down('lg')]: {
    alignSelf: 'center',
  },
}))