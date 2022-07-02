import { ReactNode } from 'react'
import { styled } from '@mui/material'
import { Topbar } from '../components/topbar/Topbar'
import { Sidebar } from '../components/sidebar/Sidebar'

const StyledWrapper = styled('div')(() => ({
  display: 'flex',
}))

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

const StyledContentContainer = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  marginLeft: 240,

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 1),
    marginLeft: 0,
  },
}))

export interface IPrimaryLayoutProps {
  children: ReactNode
}

export const PrimaryLayout = ({ children }: IPrimaryLayoutProps) => (
  <StyledWrapper>
    <Topbar />
    <Sidebar />
    <StyledContentContainer>
      <Offset />
      {children}
    </StyledContentContainer>
  </StyledWrapper>
)
