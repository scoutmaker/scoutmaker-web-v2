import { Link, Typography } from '@mui/material'
import React from 'react'

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
    <Link underline="hover" color="inherit" href={href}>
      {text}
    </Link>
  )
}
