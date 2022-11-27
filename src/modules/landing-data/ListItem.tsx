import { styled, Typography } from '@mui/material'

interface Props {
  number: string
  text: string
}

export const ListItem = ({ number, text }: Props) => (
  <Container>
    <Number>{number}</Number>
    <Typography fontSize={20}>{text}</Typography>
  </Container>
)

const Container = styled('ul')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  color: theme.palette.primary.contrastText,

  [theme.breakpoints.down('sm')]: {
    padding: 0,
  },
}))

const Number = styled('div')(({ theme }) => ({
  fontSize: 24,
  padding: theme.spacing(2),
  borderRadius: 10,
  background: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  fontWeight: theme.typography.fontWeightBold,
}))
