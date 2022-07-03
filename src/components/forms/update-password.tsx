import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { TextField, Button } from '@mui/material'
import { TFunction, useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import { Container } from './container'
import { UpdatePasswordDto } from '../../types/auth'
import { generatePasswordValidationSchema } from './utils'

const StyledForm = styled(Form)(() => ({
  width: '100%',
}))

function generateValidationSchema(
  t: TFunction,
): yup.SchemaOf<UpdatePasswordDto> {
  return yup
    .object({
      oldPassword: yup.string().required('Podaj aktualne hasło'),
      newPassword: generatePasswordValidationSchema(t),
      newPasswordConfirm: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Podane hasła muszą być takie same')
        .required('Potwierdź hasło'),
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
              label="Bieżące hasło"
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
              label="Nowe hasło"
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
              label="Potwierdź nowe hasło"
              type="password"
              id="newPasswordConfirm"
              error={touched.newPasswordConfirm && !!errors.newPasswordConfirm}
              helperText={
                touched.newPasswordConfirm && errors.newPasswordConfirm
              }
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Zmień hasło
            </Button>
          </Container>
        </StyledForm>
      )}
    </Formik>
  )
}
