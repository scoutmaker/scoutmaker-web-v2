import { ListItemIcon, MenuItem, Typography } from '@mui/material'
import { ReactElement } from 'react'

interface ITableMenuItemProps {
  icon: ReactElement
  text: string
  onClick?: () => void
  disabled?: boolean
}

export const TableMenuItem = ({
  icon,
  text,
  onClick,
  disabled,
}: ITableMenuItemProps) => (
  <MenuItem onClick={onClick} disabled={disabled}>
    <ListItemIcon>{icon}</ListItemIcon>
    <Typography variant="body2" color="textSecondary">
      {text}
    </Typography>
  </MenuItem>
)
