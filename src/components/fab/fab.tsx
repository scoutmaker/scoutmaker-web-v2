import { Fab as MUIFab } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import Link from 'next/link'

interface IFabProps {
  href: string
}

export const Fab = ({ href }: IFabProps) => (
  <Link href={href} passHref>
    <MUIFab
      color="secondary"
      aria-label="add"
      component="a"
      sx={{ position: 'fixed', right: 20, bottom: 20 }}
    >
      <AddIcon />
    </MUIFab>
  </Link>
)
