import { Formik, Field } from 'formik'
import * as yup from 'yup'
import { TextField, Grid } from '@mui/material'
import { TFunction, useTranslation } from 'next-i18next'
import Link from 'next/link'
import { PasswordResetDto } from '../../types/auth'
import { generatePasswordValidationSchema } from './utils'
import { StyledLink, StyledForm, StyledButton } from './styles'

function generateValidationSchema(
  t: TFunction,
): yup.SchemaOf<PasswordResetDto> {
  return yup
    .object({
      password: generatePasswordValidationSchema(t),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], t('PASSWORDS_DO_NOT_MATCH_ERROR'))
        .required(t('NO_PASSWORD_CONFIRM_ERROR')),
    })
    .defined()
}

interface IResetPasswordFormProps {
  onSubmit: (data: PasswordResetDto) => void
}

export const ResetPasswordForm = ({ onSubmit }: IResetPasswordFormProps) => {
  const { t } = useTranslation(['common', 'password-reset'])

  return (
    <Formik
      initialValues={{
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={data => onSubmit(data)}
      validationSchema={generateValidationSchema(t)}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <Field
            name="password"
            as={TextField}
            variant="outlined"
            fullWidth
            label={t('PASSWORD')}
            type="password"
            id="password"
            margin="normal"
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />
          <Field
            name="passwordConfirm"
            as={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            label={t('CONFIRM_PASSWORD')}
            type="password"
            id="passwordConfirm"
            error={touched.passwordConfirm && !!errors.passwordConfirm}
            helperText={touched.passwordConfirm && errors.passwordConfirm}
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
