import { Grid, Link as MUILink, Typography } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

interface ICardItemBasicProps {
  title: string
  value?: string | number | ReactNode
  href?: string
}

export const CardItemBasic = ({ title, value, href }: ICardItemBasicProps) => {
  const valueToDisplay = value || '-'

  return (
    <Grid item xs={12}>
      <Typography>
        <strong>{title}: </strong>
        {href ? (
          <Link href={href} passHref>
            <MUILink>{valueToDisplay}</MUILink>
          </Link>
        ) : (
          valueToDisplay
        )}
      </Typography>
    </Grid>
  )
}
