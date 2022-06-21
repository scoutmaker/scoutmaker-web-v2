import { Button, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Form } from 'formik'

export const StyledForm = styled(Form)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}))

export const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  margin: theme.spacing(3, 0, 2),
}))

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,

  '&:hover': {
    textDecoration: 'underline',
  },
}))
