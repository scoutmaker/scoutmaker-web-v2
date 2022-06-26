import { ReactNode } from 'react'
import { Collapse, ListItemIcon, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { StyledListItem } from './styles'

type IExpandeableNavElementProps = {
  children: ReactNode
  handleClick: () => void
  open: boolean
  icon: ReactNode
  title: string
}

export const ExpandeableNavElement = ({
  handleClick,
  open,
  icon,
  children,
  title,
}: IExpandeableNavElementProps) => (
  <>
    <StyledListItem onClick={handleClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        primaryTypographyProps={{ variant: 'body2' }}
      />
      {open ? <ExpandLess /> : <ExpandMore />}
    </StyledListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <div style={{ paddingLeft: '16px' }}>{children}</div>
    </Collapse>
  </>
)
