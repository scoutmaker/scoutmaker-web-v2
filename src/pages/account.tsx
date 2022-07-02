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
import { User } from '../types/auth'
import { useUser } from '../lib/auth'
import { PageHeading } from '../components/page-heading/page-heading'

export const getServerSideProps = withSessionSsr(
  async ({ req, res, locale }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
    ])

    return {
      props: {
        ...translations,
        user,
      },
    }
  },
)

interface IAccountPageProps {
  user: User
}

const AccountPage = ({ user }: IAccountPageProps) => {
  const { t } = useTranslation()

  const { data: userData, isLoading: userDataLoading } = useUser(user)

  const { firstName, lastName, role, email } = userData || {}

  const isLoading = userDataLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title="Profil użytkownika" />
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
              <Typography sx={{ fontWeight: 'bold' }}>Edytuj profil</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <EditAccountForm user={user} onSubmit={editDetails} /> */}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<AccordionIcon />}
              aria-controls="update-password-content"
              id="update-password-header"
            >
              <Typography sx={{ fontWeight: 'bold' }}>Zmień hasło</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <UpdatePasswordForm onSubmit={updatePassword} /> */}
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountPage
