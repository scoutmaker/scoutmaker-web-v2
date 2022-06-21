import { useFormik } from 'formik'
import Link from 'next/link'
import { TextField, Grid, capitalize } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { LoginDto } from '../../types/auth'
import { StyledForm, StyledButton, StyledLink } from './styles'
import { generateValidationSchema, initialValues } from './utils'

interface ILoginFormProps {
  onSubmit: (data: LoginDto) => void
}

export const LoginForm = ({ onSubmit }: ILoginFormProps) => {
  const { t } = useTranslation(['common', 'login'])

  const formik = useFormik<LoginDto>({
    initialValues,
    validationSchema: generateValidationSchema(t),
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
            <StyledLink>{t('login:NO_ACCOUNT')}</StyledLink>
          </Link>
        </Grid>
      </Grid>
    </StyledForm>
  )
}
