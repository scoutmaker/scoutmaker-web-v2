import { Formik, Field } from 'formik'
import { Grid, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { StyledButton, StyledForm, StyledLink } from './styles'
import {
  generateRegisterFormValidationSchema,
  registerFormInitialValues,
} from './utils'

type Props = {
  onSubmit: (data: any) => void
}

export const RegisterForm = ({ onSubmit }: Props) => {
  const { t } = useTranslation(['common', 'register'])

  return (
    <Formik
      initialValues={registerFormInitialValues}
      onSubmit={data => {
        onSubmit(data)
      }}
      validationSchema={() => generateRegisterFormValidationSchema(t)}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                name="firstName"
                as={TextField}
                variant="outlined"
                autoComplete="fname"
                fullWidth
                label="Imię"
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="lastName"
                as={TextField}
                variant="outlined"
                autoComplete="fname"
                fullWidth
                label="Nazwisko"
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="email"
                as={TextField}
                variant="outlined"
                autoComplete="email"
                fullWidth
                label="E-mail"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="password"
                type="password"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Hasło"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="passwordConfirm"
                type="password"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Potwierdź hasło"
                error={touched.passwordConfirm && !!errors.passwordConfirm}
                helperText={touched.passwordConfirm && errors.passwordConfirm}
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Zarejestruj się
          </StyledButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <StyledLink href="/login">
                Jesteś już zarejestrowany? Zaloguj się
              </StyledLink>
            </Grid>
          </Grid>
        </StyledForm>
      )}
    </Formik>
  )
}
