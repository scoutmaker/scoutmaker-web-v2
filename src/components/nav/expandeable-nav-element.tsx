import { ExpandLess, ExpandMore } from '@mui/icons-material'
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { ReactNode } from 'react'

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
    <ListItemButton
      onClick={handleClick}
      sx={{
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        primaryTypographyProps={{ variant: 'body2' }}
      />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <div style={{ paddingLeft: '16px' }}>{children}</div>
    </Collapse>
  </>
)
