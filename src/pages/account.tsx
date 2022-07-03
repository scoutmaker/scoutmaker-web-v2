import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ExpandMore as AccordionIcon } from '@mui/icons-material'
import { Loader } from '../components/loader/loader'
import { withSessionSsr } from '../lib/session'
import { redirectToLogin } from '../utils/redirect-to-login'
import { UpdateUserDto, User } from '../types/auth'
import { useUpdatePassword, useUpdateUser, useUser } from '../lib/auth'
import { PageHeading } from '../components/page-heading/page-heading'
import { EditAccountForm } from '../components/forms/edit-account'
import { UpdatePasswordForm } from '../components/forms/update-password'

export const getServerSideProps = withSessionSsr(
  async ({ req, res, locale }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'account',
    ])

    return {
      props: {
        ...translations,
        user,
      },
    }
  },
)

const AccountPage = () => {
  const { t } = useTranslation(['common', 'account'])

  const { data: userData, isLoading: userDataLoading } = useUser()
  const { mutate: updateUser, isLoading: updateUserLoading } = useUpdateUser()
  const { mutate: updatePassword, isLoading: updatePasswordLoading } =
    useUpdatePassword()

  const { firstName, lastName, role, email } = userData || {}

  const isLoading =
    userDataLoading || updateUserLoading || updatePasswordLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('account:PAGE_TITLE')} />
      <Card sx={{ width: '100%' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: 'error.main' }}>
              {`${firstName?.[0]}${lastName?.[0]}`}
            </Avatar>
          }
          title={`${firstName} ${lastName} (${role})`}
          subheader={`${email}`}
        />
        <CardContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<AccordionIcon />}
              aria-controls="edit-profile-content"
              id="edit-profile-header"
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                {t('account:EDIT_PROFILE')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <EditAccountForm
                user={userData as User}
                handleSubmit={(data: UpdateUserDto) => updateUser(data)}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<AccordionIcon />}
              aria-controls="update-password-content"
              id="update-password-header"
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                {t('account:UPDATE_PASSWORD')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <UpdatePasswordForm onSubmit={updatePassword} />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountPage
