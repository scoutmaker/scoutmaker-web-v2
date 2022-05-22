import { useFormik } from 'formik'
import Link from 'next/link'
import { TextField, Button, Grid, Link as MUILink } from '@mui/material'
import { styled } from '@mui/material/styles'
import { LoginDto } from '../../types/auth'
import { validationSchema } from './validation-schema'

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}))

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  margin: theme.spacing(3, 0, 2),
}))

const StyledLink = styled(MUILink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,

  '&:hover': {
    textDecoration: 'underline',
  },
}))

interface ILoginFormProps {
  onSubmit: (data: LoginDto) => void
}

export const LoginForm = ({ onSubmit }: ILoginFormProps) => {
  const formik = useFormik<LoginDto>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      onSubmit(values)
    },
  })

  const { handleSubmit, errors, touched, getFieldProps } = formik

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label="Email"
        autoComplete="email"
        autoFocus
        {...getFieldProps('email')}
        error={touched.email && !!errors.email}
        helperText={touched.email && !!errors.email && errors.email}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Hasło"
        type="password"
        id="password"
        autoComplete="current-password"
        {...getFieldProps('password')}
        error={touched.password && !!errors.password}
        helperText={touched.password && !!errors.password && errors.password}
      />
      <StyledButton type="submit" fullWidth variant="contained" color="primary">
        Zaloguj się
      </StyledButton>
      <Grid container>
        <Grid item xs>
          <Link href="/forgot-password" passHref>
            <StyledLink>Zapomniałeś hasła?</StyledLink>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/register" passHref>
            <StyledLink href="/register">
              Nie masz konta? Zarejestruj się
            </StyledLink>
          </Link>
        </Grid>
      </Grid>
    </StyledForm>
  )
}
