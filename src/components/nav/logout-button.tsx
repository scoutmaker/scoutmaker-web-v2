import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ExitToApp as LogoutIcon } from '@mui/icons-material'
import { useLogout } from '../../lib/auth'

export const LogoutButton = () => {
  const { mutate: logout } = useLogout()

  return (
    <ListItemButton
      sx={{
        '&:hover': {
          backgroundColor: 'primary.light',
        },
      }}
      onClick={() => logout()}
    >
      <ListItemIcon>
        <LogoutIcon color="error" />
      </ListItemIcon>
      <ListItemText
        primary="Wyloguj"
        primaryTypographyProps={{ variant: 'body2' }}
      />
    </ListItemButton>
  )
}
