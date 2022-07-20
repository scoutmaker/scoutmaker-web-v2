import { capitalize, Grid, TextField } from '@mui/material'
import { Field, Formik } from 'formik'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { LoginDto } from '@/types/auth'

import { StyledButton, StyledForm, StyledLink } from './styles'
import {
  generateLoginFormValidationSchema,
  loginFormInitialValues,
} from './utils'

interface ILoginFormProps {
  onSubmit: (data: LoginDto) => void
}

export const LoginForm = ({ onSubmit }: ILoginFormProps) => {
  const { t } = useTranslation(['common', 'login'])

  return (
    <Formik
      initialValues={loginFormInitialValues}
      onSubmit={data => onSubmit(data)}
      validationSchema={() => generateLoginFormValidationSchema(t)}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <Field
            as={TextField}
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label={capitalize(t('EMAIL'))}
            autoComplete="email"
            autoFocus
            error={touched.email && !!errors.email}
            helperText={touched.email && !!errors.email && errors.email}
          />
          <Field
            as={TextField}
            name="password"
            variant="outlined"
            margin="normal"
            fullWidth
            label={capitalize(t('PASSWORD'))}
            type="password"
            id="password"
            autoComplete="current-password"
            error={touched.password && !!errors.password}
            helperText={
              touched.password && !!errors.password && errors.password
            }
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
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
      )}
    </Formik>
  )
}
