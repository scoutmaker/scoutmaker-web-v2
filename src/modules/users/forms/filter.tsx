import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { ClubsCombo } from '@/modules/clubs/combo'
import { ClubBasicDataDto } from '@/modules/clubs/types'
import { RegionsCombo } from '@/modules/regions/combo'
import { RegionDto } from '@/modules/regions/types'
import { UserFootballRolesCombo } from '@/modules/user-football-roles/combo'
import { UserFootballRoleDto } from '@/modules/user-football-roles/types'

import { RoleSelect } from '../role-select'
import { UsersFiltersDto } from '../types'

interface IFormProps {
  filters: UsersFiltersDto
  onFilter: (data: UsersFiltersDto) => void
  onClearFilters: () => void
  regionsData: RegionDto[]
  clubsData: ClubBasicDataDto[]
  userFootballRolesData: UserFootballRoleDto[]
}

export const UsersFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  regionsData,
  clubsData,
  userFootballRolesData,
}: IFormProps) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={filters}
      onSubmit={data => onFilter(data)}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <Container>
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              size="small"
            />
            <RoleSelect name="role" label={t('ROLE')} />
            <RegionsCombo data={regionsData} name="regionIds" multiple />
            <ClubsCombo data={clubsData} name="clubIds" multiple />
            <UserFootballRolesCombo
              data={userFootballRolesData}
              name="footballRoleIds"
              multiple
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
