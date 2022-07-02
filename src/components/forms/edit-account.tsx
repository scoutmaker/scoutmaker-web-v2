import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { TextField, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
// import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect'
import { UpdateUserDto, User } from '../../types/auth'
import { Container } from './container'
import { ClubsCombo } from '../selects/clubs-combo'
import { useClubsList } from '../../lib/clubs'
import { UserFootballRolesCombo } from '../selects/user-football-roles-combo'
import { useUserFootballRolesList } from '../../lib/user-football-roles'
import { RegionsCombo } from '../selects/regions-combo'
import { useRegionsList } from '../../lib/regions'

const StyledForm = styled(Form)(() => ({
  width: '100%',
}))

const StyledButtonsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}))

const validationSchema: yup.SchemaOf<UpdateUserDto> = yup
  .object({
    firstName: yup.string().required('Podaj imię'),
    lastName: yup.string().required('Podaj nazwisko'),
    clubId: yup.string(),
    footballRoleId: yup.string(),
    city: yup.string(),
    phone: yup.string(),
    activeRadius: yup
      .number()
      .min(0, 'Promień działania musi być większy lub równy 0 '),
    regionId: yup.string(),
  })
  .defined()

interface IEditAccountFormProps {
  user: User
  handleSubmit: (data: UpdateUserDto) => void
}

export const EditAccountForm = ({
  user,
  handleSubmit,
}: IEditAccountFormProps) => {
  const {
    firstName,
    lastName,
    city,
    club,
    footballRole,
    activeRadius,
    region,
    phone,
  } = user

  const initialValues: UpdateUserDto = {
    firstName,
    lastName,
    city: city || '',
    phone: phone || '',
    activeRadius,
    clubId: club?.id || '',
    footballRoleId: footballRole?.id || '',
    regionId: region?.id || '',
  }

  const { data: clubs } = useClubsList()
  const { data: userFootballRoles } = useUserFootballRolesList()
  const { data: regions } = useRegionsList()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={data => handleSubmit(data)}
      validationSchema={validationSchema}
    >
      {({ errors, touched, handleReset }) => (
        <StyledForm>
          <Container>
            <Field
              name="firstName"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Imię"
              error={touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
            <Field
              name="lastName"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Nazwisko"
              error={touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
            />
            <RegionsCombo data={regions || []} label="Region" name="regionId" />
            <Field
              name="city"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Miasto"
              error={touched.city && !!errors.city}
              helperText={touched.city && errors.city}
            />
            <ClubsCombo clubsData={clubs || []} label="Klub" name="clubId" />
            <UserFootballRolesCombo
              userFootballRolesData={userFootballRoles || []}
              label="Rola"
              name="footballRoleId"
            />
            <Field
              name="phone"
              as={TextField}
              type="tel"
              variant="outlined"
              fullWidth
              label="Nr telefonu"
              error={touched.phone && !!errors.phone}
              helperText={
                (touched.phone && errors.phone) ||
                'np. 123456789 (bez myślników)'
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
                'Podaj maksymalną odległość w km, jaką możesz pokonać w celu obserwacji zawodnika'
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
                Zapisz zmiany
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleReset}
              >
                Reset
              </Button>
            </StyledButtonsContainer>
          </Container>
        </StyledForm>
      )}
    </Formik>
  )
}
