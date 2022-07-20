import { Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Field, Form, Formik } from 'formik'
import { TFunction, useTranslation } from 'next-i18next'
import * as yup from 'yup'

import { UpdatePasswordDto } from '@/types/auth'

import { Container } from './container'
import { generatePasswordValidationSchema } from './utils'

const StyledForm = styled(Form)(() => ({
  width: '100%',
}))

function generateValidationSchema(
  t: TFunction,
): yup.SchemaOf<UpdatePasswordDto> {
  return yup
    .object({
      oldPassword: yup
        .string()
        .required(t('account:NO_CURRENT_PASSWORD_ERROR')),
      newPassword: generatePasswordValidationSchema(t),
      newPasswordConfirm: yup
        .string()
        .oneOf([yup.ref('newPassword')], t('PASSWORDS_DO_NOT_MATCH_ERROR'))
        .required(t('account:NO_PASSWORD_CONFIRM_ERROR')),
    })
    .defined()
}

interface IUpdatePasswordFormProps {
  onSubmit: (data: UpdatePasswordDto) => void
}

export const UpdatePasswordForm = ({ onSubmit }: IUpdatePasswordFormProps) => {
  const { t } = useTranslation(['common', 'account'])

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      }}
      onSubmit={data => onSubmit(data)}
      validationSchema={generateValidationSchema(t)}
    >
      {({ errors, touched }) => (
        <StyledForm>
          <Container>
            <Field
              name="oldPassword"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('account:CURRENT_PASSWORD')}
              type="password"
              id="oldPassword"
              error={touched.oldPassword && !!errors.oldPassword}
              helperText={touched.oldPassword && errors.oldPassword}
            />
            <Field
              name="newPassword"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('account:NEW_PASSWORD')}
              type="password"
              id="newPassword"
              error={touched.newPassword && !!errors.newPassword}
              helperText={touched.newPassword && errors.newPassword}
            />
            <Field
              name="newPasswordConfirm"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('account:CONFIRM_PASSWORD')}
              type="password"
              id="newPasswordConfirm"
              error={touched.newPasswordConfirm && !!errors.newPasswordConfirm}
              helperText={
                touched.newPasswordConfirm && errors.newPasswordConfirm
              }
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t('account:CHANGE_PASSWORD')}
            </Button>
          </Container>
        </StyledForm>
      )}
    </Formik>
  )
}
