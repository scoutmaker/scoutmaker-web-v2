import { Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { updatedDiff } from 'deep-object-diff'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { TFunction, useTranslation } from 'next-i18next'
import * as yup from 'yup'

import { UpdateUserDto, User } from '@/modules/auth/auth'
import { useClubsList } from '@/modules/clubs/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { useUserFootballRolesList } from '@/modules/user-football-roles/hooks'
import { validateId } from '@/utils/validation-helpers'

import { ClubsCombo } from '../selects/clubs-combo'
import { RegionsCombo } from '../selects/regions-combo'
import { UserFootballRolesCombo } from '../selects/user-football-roles-combo'
import { Container } from './container'

const StyledForm = styled(Form)(() => ({
  width: '100%',
}))

const StyledButtonsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}))

function generateValidationSchema(t: TFunction): yup.SchemaOf<UpdateUserDto> {
  return yup
    .object({
      firstName: yup.string().required(t('NO_FIRST_NAME_ERROR')),
      lastName: yup.string().required(t('NO_LAST_NAME_ERROR')),
      clubId: validateId(),
      footballRoleId: validateId(),
      city: yup.string(),
      phone: yup.string(),
      activeRadius: yup
        .number()
        .min(0, t('account.ACTIVE_RADIUS_VALIDATION_ERROR')),
      regionId: validateId(),
    })
    .defined()
}

interface IEditAccountFormProps {
  user: User
  handleSubmit: (data: UpdateUserDto) => void
}

export const EditAccountForm = ({
  user,
  handleSubmit,
}: IEditAccountFormProps) => {
  const { t } = useTranslation(['common', 'account'])

  const {
    firstName,
    lastName,
    city,
    club,
    footballRole,
    activeRadius,
    region,
    phone,
  } = user || {}

  const initialValues: UpdateUserDto = {
    firstName: firstName || '',
    lastName: lastName || '',
    city: city || '',
    phone: phone || '',
    activeRadius: activeRadius || 0,
    clubId: club?.id || 0,
    footballRoleId: footballRole?.id || 0,
    regionId: region?.id || 0,
  }

  const { data: clubs } = useClubsList()
  const { data: userFootballRoles } = useUserFootballRolesList()
  const { data: regions } = useRegionsList()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={data => {
        const dataToSubmit = updatedDiff(
          initialValues,
          filter(data, (_, value) => value),
        )
        handleSubmit(dataToSubmit)
      }}
      validationSchema={generateValidationSchema(t)}
      enableReinitialize
    >
      {({ errors, touched, handleReset }) => (
        <StyledForm>
          <Container>
            <Field
              name="firstName"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('FIRST_NAME')}
              error={touched.firstName && !!errors.firstName}
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
            />
            <RegionsCombo data={regions || []} name="regionId" />
            <Field
              name="city"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('CITY')}
              error={touched.city && !!errors.city}
              helperText={touched.city && errors.city}
            />
            <ClubsCombo data={clubs || []} name="clubId" />
            <UserFootballRolesCombo
              data={userFootballRoles || []}
              name="footballRoleId"
            />
            <Field
              name="phone"
              as={TextField}
              type="tel"
              variant="outlined"
              fullWidth
              label={t('PHONE_NUMBER')}
              error={touched.phone && !!errors.phone}
              helperText={
                (touched.phone && errors.phone) ||
                t('account:PHONE_FIELD_HELPER_TEXT')
              }
            />
            <Field
              name="activeRadius"
              type="number"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Promień działania"
              error={touched.activeRadius && !!errors.activeRadius}
              helperText={
                (touched.activeRadius && errors.activeRadius) ||
                t('account:ACTIVE_RADIUS_HELPER_TEXT')
              }
              inputProps={{
                min: 0,
              }}
            />
            <StyledButtonsContainer>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {t('SAVE_CHANGES')}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleReset}
              >
                {t('RESET')}
              </Button>
            </StyledButtonsContainer>
          </Container>
        </StyledForm>
      )}
    </Formik>
  )
}
