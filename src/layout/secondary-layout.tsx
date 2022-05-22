import { Container, Avatar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ReactNode } from 'react'
import logoColor from '../../public/logo-color.png'

interface ISecondaryLayoutProps {
  title: string
  children: ReactNode
}

const StyledWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: theme.spacing(8),
}))

export const SecondaryLayout = ({ title, children }: ISecondaryLayoutProps) => (
  <Container component="main" maxWidth="xs">
    <StyledWrapper>
      <Avatar
        variant="square"
        src={logoColor.src}
        alt="PlaymakerPro Logo"
        sx={{ margin: 1, width: 92, height: 84 }}
      />
      <Typography component="h1" variant="h5" align="center">
        {title}
      </Typography>
      {children}
    </StyledWrapper>
  </Container>
)
