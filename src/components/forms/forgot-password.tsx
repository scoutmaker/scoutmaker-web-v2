import { capitalize, Grid, TextField } from '@mui/material'
import { Field, Formik } from 'formik'
import Link from 'next/link'
import { TFunction, useTranslation } from 'next-i18next'
import * as yup from 'yup'

import { ForgotPasswordDto } from '@/types/auth'

import { StyledButton, StyledForm, StyledLink } from './styles'

function generateValidationSchema(
  t: TFunction,
): yup.SchemaOf<ForgotPasswordDto> {
  return yup
    .object({
      email: yup
        .string()
        .email(t('INVALID_EMAIL_ERROR'))
        .required(t('NO_EMAIL_ERROR')),
    })
    .defined()
}

interface IForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordDto) => void
}

export const ForgotPasswordForm = ({ onSubmit }: IForgotPasswordFormProps) => {
  const { t } = useTranslation(['common', 'password-reset'])

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(data, { resetForm }) => {
        onSubmit(data)
        resetForm()
      }}
      validationSchema={() => generateValidationSchema(t)}
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
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {t('SEND')}
          </StyledButton>
          <Grid container columns={{ sm: 6, md: 12 }}>
            <Grid item sm={12} md={6}>
              <Link href="/login" passHref>
                <StyledLink>{t('password-reset:BACK_TO_LOGIN')}</StyledLink>
              </Link>
            </Grid>
            <Grid item sm={12} md={6}>
              <Link href="/register" passHref>
                <StyledLink>{t('password-reset:NO_ACCOUNT')}</StyledLink>
              </Link>
            </Grid>
          </Grid>
        </StyledForm>
      )}
    </Formik>
  )
}
