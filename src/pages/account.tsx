import { ExpandMore as AccordionIcon } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { UpdateUserDto, User } from '@/modules/auth/auth'
import { EditAccountForm } from '@/modules/auth/forms/edit-account'
import { UpdatePasswordForm } from '@/modules/auth/forms/update-password'
import { useUpdatePassword, useUpdateUser, useUser } from '@/modules/auth/hooks'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'account'],
  false,
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
