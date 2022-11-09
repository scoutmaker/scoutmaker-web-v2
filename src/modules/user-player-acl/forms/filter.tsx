import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { UserPlayerAclFiltersState } from '../types'

interface IFormProps {
  filters: UserPlayerAclFiltersState
  onFilter: (data: UserPlayerAclFiltersState) => void
  onClearFilters: () => void
  usersData: UserBasicDataDto[]
  playersData: PlayerBasicDataDto[]
}

export const UserPlayerAclFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  playersData,
  usersData,
}: IFormProps) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={filters}
      onSubmit={(data, form) => {
        onFilter(data)
        form.setSubmitting(false)
      }}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <FilterFormContainer>
            <FilterCombo
              data={mapUsersListToComboOptions(usersData)}
              name="userId"
              label={t('USER')}
              size="small"
            />
            <FilterCombo
              data={mapPlayersListToComboOptions(playersData)}
              name="playerId"
              label={t('PLAYER')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}
