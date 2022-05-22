import { useFormik } from 'formik'
import Link from 'next/link'
import {
  TextField,
  Button,
  Grid,
  Link as MUILink,
  capitalize,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import * as yup from 'yup'
import { LoginDto } from '../../types/auth'

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
  const { t } = useTranslation(['common', 'login'])

  const validationSchema: yup.SchemaOf<LoginDto> = yup
    .object({
      email: yup
        .string()
        .email(t('login:INVALID_EMAIL_ERROR'))
        .required(t('login:NO_EMAIL_ERROR')),
      password: yup.string().required(t('login:NO_PASSWORD_ERROR')),
    })
    .defined()

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
        label={capitalize(t('EMAIL'))}
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
        label={capitalize(t('PASSWORD'))}
        type="password"
        id="password"
        autoComplete="current-password"
        {...getFieldProps('password')}
        error={touched.password && !!errors.password}
        helperText={touched.password && !!errors.password && errors.password}
      />
      <StyledButton type="submit" fullWidth variant="contained" color="primary">
        {t('login:BUTTON_TEXT')}
      </StyledButton>
      <Grid container columns={{ sm: 6, md: 12 }}>
        <Grid item sm={12} md={6}>
          <Link href="/forgot-password" passHref>
            <StyledLink>{t('login:FORGOT_PASSWORD')}</StyledLink>
          </Link>
        </Grid>
        <Grid item sm={12} md={6}>
          <Link href="/register" passHref>
            <StyledLink href="/register">{t('login:NO_ACCOUNT')}</StyledLink>
          </Link>
        </Grid>
      </Grid>
    </StyledForm>
  )
}
