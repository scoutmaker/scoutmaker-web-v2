import { Grid, TextField } from '@mui/material'
import { Field, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { RegisterDto } from '@/modules/auth/auth'

import { StyledButton, StyledForm, StyledLink } from './styles'
import {
  generateRegisterFormValidationSchema,
  registerFormInitialValues,
} from './utils'

type Props = {
  onSubmit: (data: RegisterDto) => void
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
                label={t('FIRST_NAME')}
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
                label={t('LAST_NAME')}
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
                label={t('EMAIL')}
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
                label={t('PASSWORD')}
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
                label={t('CONFIRM_PASSWORD')}
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
            {t('register:BUTTON_TEXT')}
          </StyledButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <StyledLink href="/login">
                {t('register:ALREADY_REGISTERED')}
              </StyledLink>
            </Grid>
          </Grid>
        </StyledForm>
      )}
    </Formik>
  )
}
