import { LocalPhone as PhoneIcon, Mail as MailIcon } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "next-i18next";
import * as yup from 'yup'

import { useAlertsState } from '@/context/alerts/useAlertsState';

import { MainFormActions } from "../forms/main-form-actions";
import { Loader } from "../loader/loader";

type Props = {
  onClose: () => void;
  open: boolean;
};

export const ContactFormModal = ({ onClose, open }: Props) => {
  const { t } = useTranslation()

  // const { mutate: sendEmail, isLoading } = useSendEmail();
  const { setAlert } = useAlertsState();
  const isLoading = false

  return (
    <>
      {isLoading && <Loader />}
      <StyledDialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{t('landing:CONTACT_FORM_TITLE')}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              from: '',
              subject: '',
              message: '',
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(data, { resetForm }) => {
              // sendEmail(data);
              resetForm();
            }}
          >
            {({ errors, touched, handleReset }) => (
              <Form>
                <Container >
                  <Field
                    name="from"
                    as={TextField}
                    type="email"
                    variant="outlined"
                    fullWidth
                    label={t('landing:YOUR_EMAIL')}
                    id="from"
                    error={touched.from && !!errors.from}
                    helperText={touched.from && errors.from}
                  />
                  <Field
                    name="subject"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label={t('landing:MESSAGE_TOPIC')}
                    error={touched.subject && !!errors.subject}
                    helperText={touched.subject && errors.subject}
                  />
                  <Field
                    name="message"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label={t('landing:MESSAGE_CONTENT')}
                    error={touched.message && !!errors.message}
                    helperText={touched.message && errors.message}
                    multiline
                  />
                  <MainFormActions
                    altActionLabel={t('SEND')}
                    label={t('landing:MESSAGE')}
                    isEditState={false}
                    onCancelClick={() => {
                      setAlert({
                        msg: t('CHANGES_CANCELED'),
                        type: 'warning',
                      });
                      handleReset();
                    }}
                  />
                </Container>
              </Form>
            )}
          </Formik>
          <ContactContainer>
            <ContactLink href="tel:+48504271466">
              <PhoneIcon />
              +48 504 271 466
            </ContactLink>
            <ContactLink href="mailto:biuro@playmaker.pro" >
              <MailIcon />
              biuro@playmaker.pro
            </ContactLink>
          </ContactContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {t('CLOSE')}
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export const Container = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0, 'auto', 2),
    gap: theme.spacing(2),
    width: '100%',
  }),
)

const StyledDialog = styled(Dialog)({
  '& .MuiPaper-root': {
    width: '95%'
  }
});

const ContactContainer = styled('div')(({ theme }) => ({
  fontSize: 18,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  color: theme.palette.primary.main,
}))

const ContactLink = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  color: theme.palette.primary.main,
}))

const validationSchema = yup
  .object({
    from: yup
      .string()
      .required('Proszę podać swój adres email')
      .email('Proszę podać poprawny adres email'),
    subject: yup.string().required('Proszę podać temat wiadomości'),
    message: yup.string().required('Proszę podać treść wiadomości'),
  })
  .defined();