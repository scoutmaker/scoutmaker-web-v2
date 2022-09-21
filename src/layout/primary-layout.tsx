import { styled } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'

import { Alerts } from '../components/alerts/Alerts'
import { Sidebar } from '../components/sidebar/Sidebar'
import { Topbar } from '../components/topbar/Topbar'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

const StyledContentContainer = styled('main')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  marginLeft: 240,
  flexGrow: 1,

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 1),
    marginLeft: 0,
  },
}))

export interface IPrimaryLayoutProps {
  children: ReactNode
}

export const PrimaryLayout = ({ children }: IPrimaryLayoutProps) => {
  const router = useRouter()

  return (
    <div>
      <Topbar />
      <Sidebar />
      <StyledContentContainer>
        <Offset />
        {router.route !== '/dashboard' ? <Breadcrumbs /> : null}
        <main>{children}</main>
      </StyledContentContainer>
      <Alerts />
    </div>
  )
}
