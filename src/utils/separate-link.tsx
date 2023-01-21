import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'

export const separateLink = (txt: string, href: string) => {
  const separated = txt.split('LINK')
  return (
    <>
      {separated[0]}
      <Link href={href} passHref>
        <MuiLink>{separated[1]}</MuiLink>
      </Link>
      {separated[2]}
    </>
  )
}
