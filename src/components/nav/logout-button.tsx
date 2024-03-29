import { ExitToApp as LogoutIcon } from '@mui/icons-material'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { useLogout } from '@/modules/auth/hooks'

export const LogoutButton = () => {
  const { t } = useTranslation()
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
        primary={t('LOGOUT')}
        primaryTypographyProps={{ variant: 'body2' }}
      />
    </ListItemButton>
  )
}
