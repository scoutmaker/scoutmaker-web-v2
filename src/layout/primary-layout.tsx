import { ReactNode } from 'react'
import { Topbar } from '../components/topbar/Topbar'

export interface IPrimaryLayoutProps {
  children: ReactNode
}

export const PrimaryLayout = ({ children }: IPrimaryLayoutProps) => (
  <div>
    <Topbar />
    <main>
      <div>{children}</div>
    </main>
  </div>
)
