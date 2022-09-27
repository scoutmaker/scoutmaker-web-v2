import { ArrowForwardIos as ArrowIcon } from '@mui/icons-material'
import { Button, styled } from '@mui/material'
import Link from 'next/link'

interface Props {
  text: string
  href: string
}

export const GoToSectionButton = ({ text, href }: Props) => (
  <Link href={href}>
    <StyledButton color="secondary" variant="contained" endIcon={<ArrowIcon />}>
      {text}
    </StyledButton>
  </Link>
)

const StyledButton = styled(Button)(({ theme }) => ({
  width: 350,
  padding: 16,
  fontSize: 16,
  fontWeight: theme.typography.fontWeightBold,
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.down('xs')]: {
    width: 300,
  },
}))
