import { ReactNode } from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {
  icon: ReactNode
  text: string
  to: string
  onClick?: () => void
}

export const NavElement = ({ icon, text, to, onClick }: Props) => {
  const router = useRouter()

  return (
    <Link href={to} passHref>
      <ListItemButton
        onClick={onClick}
        component="a"
        sx={[
          {
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          },
          to === router.pathname && {
            backgroundColor: 'primary.light',
          },
        ]}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={text}
          primaryTypographyProps={{ variant: 'body2' }}
        />
      </ListItemButton>
    </Link>
  )
}
