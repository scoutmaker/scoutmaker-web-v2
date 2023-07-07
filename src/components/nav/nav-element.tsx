import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  text: string
  to: string
  download?: boolean
  newTab?: boolean
}

export const NavElement = ({ icon, text, to, download, newTab }: Props) => {
  const router = useRouter()

  return (
    <Link href={to} passHref download={download}>
      <ListItemButton
        component="a"
        download={download}
        target={newTab ? '_blank' : undefined}
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
