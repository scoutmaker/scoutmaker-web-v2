import { Link as MUILink } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import { StyledTableCell } from '@/components/tables/cell'

interface ICellWithLinkProps {
  href: string
  label: string
}

export const CellWithLink = ({ href, label }: ICellWithLinkProps) => (
  <StyledTableCell>
    <Link href={href} passHref>
      <MUILink onClick={e => e.stopPropagation()}>{label}</MUILink>
    </Link>
  </StyledTableCell>
)
