import { Box, Button, styled, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import * as yup from 'yup'

import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper'
import { Loader } from '@/components/loader/loader'

import { useSendLandingEmail } from './hooks'

interface IProps {
  title: string
  emailTopic: string
}

export const ContactForm = ({ title, emailTopic }: IProps) => {
  const { t } = useTranslation()

  const { mutate: sendEmail, isLoading } = useSendLandingEmail()

  return (
    <>
      {isLoading && <Loader />}
      <MainContainer>
        <LayoutContentWrapper>
          <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h2" paddingBottom={2}>
              {title}
            </Typography>
            <Typography>
              Wypełnij formularz, a nasz konsultant chętnie odpowie Ci na
              wszystkie pytania związane z naszą działalnością!
            </Typography>
            <Typography>Wprowadź skauting na wyższy poziom!</Typography>
          </Box>
          <FormContainer>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                tel: '',
                club: '',
                title: emailTopic,
              }}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={(data, { resetForm }) => {
                sendEmail(data)
                resetForm()
              }}
            >
              {({ errors, touched }) => (
                <Form id="contactform">
                  <Container>
                    <Field
                      name="firstName"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      label={t('FIRST_NAME')}
                      error={touched.firstName && !!errors.firstName}
                      size="small"
                      helperText={touched.firstName && errors.firstName}
                    />
                    <Field
                      name="lastName"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      label={t('LAST_NAME')}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      size="small"
                    />
                    <Field
                      name="tel"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      type="tel"
                      label={t('PHONE_NUMBER')}
                      error={touched.tel && !!errors.tel}
                      helperText={touched.tel && errors.tel}
                      size="small"
                    />
                    <Field
                      name="email"
                      as={TextField}
                      variant="outlined"
                      fullWidth
                      type="email"
                      label={t('EMAIL')}
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      size="small"
                    />
                    <Field
                      name="club"
                      as={TextField}
                      variant="outlined"
                      label={t('landing:CLUB_NAME')}
                      error={touched.club && !!errors.club}
                      helperText={touched.club && errors.club}
                      size="small"
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      type="submit"
                      sx={{ paddingX: 6 }}
                    >
                      {t('SEND')}
                    </Button>
                  </Container>
                </Form>
              )}
            </Formik>
          </FormContainer>
        </LayoutContentWrapper>
      </MainContainer>
    </>
  )
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(2),
  maxWidth: 450,
  margin: '0 auto',
}))

const FormContainer = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(4, 0),
  maxWidth: 650,
  margin: '0 auto',
  marginTop: theme.spacing(4),
}))

const MainContainer = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(12),
  marginBottom: theme.spacing(-2.9),
  background: '#000',
  color: theme.palette.primary.contrastText,
}))

const validationSchema = yup
  .object({
    email: yup
      .string()
      .email('Proszę podać poprawny adres email')
      .required('Proszę podać swój adres email'),
    firstName: yup.string().required('Proszę podać imię'),
    lastName: yup.string().required('Proszę podać nazwisko'),
    tel: yup.number().required('Proszę podać numer telefonu'),
    club: yup.string().required('Proszę podać nazwę klubu'),
    title: yup.string().required(),
  })
  .defined()
