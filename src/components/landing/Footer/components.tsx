import { Divider as DDivider, styled } from "@mui/material";

export const Container = styled('footer')(({ theme }) => ({
  background: '#000',
  marginTop: theme.spacing(3),
}))

export const InnerWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: 150,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2, 0),

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}))

export const IconsWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
}))

export const PlaymakerLogo = styled('img')({
  height: 100,
})

export const SocialIconsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
}))

export const SocialLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
}))

export const LinksContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: theme.spacing(3),
  fontSize: 16,
  flex: 1,

  '& a': {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))

export const Divider = styled(DDivider)(({ theme }) => ({
  background: theme.palette.primary.contrastText,
  width: 4,
  height: 60,

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

export const ContactContainer = styled('footer')(({ theme }) => ({
  fontSize: 18,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginLeft: theme.spacing(4),
}))

export const ContactLink = styled('a')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
}))
