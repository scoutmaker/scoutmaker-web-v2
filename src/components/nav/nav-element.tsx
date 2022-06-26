import { ReactNode } from 'react'
// MUI components
import { ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { StyledListItem } from './styles'

type Props = {
  icon: ReactNode
  text: string
  to: string
  onClick?: () => void
}

export const NavElement = ({ icon, text, to, onClick }: Props) => (
  <li>
    <Link href={to}>
      <StyledListItem onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </StyledListItem>
    </Link>
  </li>
)
