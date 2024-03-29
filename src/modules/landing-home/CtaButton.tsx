import { ArrowForwardIos as ArrowIcon } from '@mui/icons-material'
import { Button, styled } from '@mui/material'
import Link from 'next/link'

interface IProps {
  text: string
  href: string
}

export const CtaButton = ({ text, href }: IProps) => (
  <Link href={href} passHref>
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a style={{ textDecoration: 'none' }}>
      <CustomButton
        color="secondary"
        variant="contained"
        endIcon={<ArrowIcon />}
      >
        {text}
      </CustomButton>
    </a>
  </Link>
)

const CustomButton = styled(Button)(({ theme }) => ({
  width: 280,
  padding: 16,
  fontSize: 16,
  fontWeight: theme.typography.fontWeightBold,
  display: 'flex',
  justifyContent: 'space-between',

  [theme.breakpoints.down('xs')]: {
    width: 300,
  },
}))
