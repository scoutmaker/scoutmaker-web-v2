import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { ClubBasicDataDto } from '@/modules/clubs/types'
import { RegionDto } from '@/modules/regions/types'
import { UserFootballRoleDto } from '@/modules/user-football-roles/types'

import { RoleSelect } from '../role-select'
import { UsersFiltersState } from '../types'

interface IFormProps {
  filters: UsersFiltersState
  onFilter: (data: UsersFiltersState) => void
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
            <RoleSelect name="role" label={t('ROLE')} size="small" />
            <FilterCombo
              data={mapListDataToComboOptions(regionsData)}
              name="regionIds"
              multiple
              size="small"
              label={t('REGIONS')}
            />
            <FilterCombo
              data={mapListDataToComboOptions(clubsData)}
              name="clubIds"
              multiple
              size="small"
              label={t('CLUBS')}
            />
            <FilterCombo
              data={mapListDataToComboOptions(userFootballRolesData)}
              name="footballRoleIds"
              multiple
              size="small"
              label={t('FOOTBAL_ROLES')}
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
