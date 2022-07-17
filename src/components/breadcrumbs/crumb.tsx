import { Link as MUILink, Typography } from '@mui/material'
import Link from 'next/link'

interface ICrumbProps {
  text: string
  href: string
  last?: boolean
}

export const Crumb = ({ text, href, last }: ICrumbProps) => {
  if (last) {
    return <Typography color="text.primary">{text}</Typography>
  }

  return (
    <Link href={href} passHref>
      <MUILink underline="hover" color="inherit">
        {text}
      </MUILink>
    </Link>
  )
}
