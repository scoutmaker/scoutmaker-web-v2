import { ReactNode } from 'react'
import { styled } from '@mui/material'
import { Topbar } from '../components/topbar/Topbar'

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export interface IPrimaryLayoutProps {
  children: ReactNode
}

export const PrimaryLayout = ({ children }: IPrimaryLayoutProps) => (
  <div>
    <Topbar />
    <Offset />
    <main>
      <div>{children}</div>
    </main>
  </div>
)
