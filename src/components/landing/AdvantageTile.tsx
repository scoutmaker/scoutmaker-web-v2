import { styled, Typography } from '@mui/material'

import { Advantage } from './types'

interface IProps {
  advantage: Advantage
}

export const AdvantageTile = ({ advantage }: IProps) => {
  const { title, icon, text } = advantage

  return (
    <TileContainer>
      <Heading>
        <Title variant="h4">{title}</Title>
        {icon}
      </Heading>
      <Text>{text}</Text>
    </TileContainer>
  )
}

const TileContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
}))

const Heading = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: theme.typography.fontWeightBold,
}))

const Text = styled(Typography)(({ theme }) => ({
  paddingRight: theme.spacing(2),
}))
