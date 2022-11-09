import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'
import { PlayerBasicDataDto } from '@/modules/players/types'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'

import { OrganizationPlayerAclFiltersState } from '../types'

interface IFormProps {
  filters: OrganizationPlayerAclFiltersState
  onFilter: (data: OrganizationPlayerAclFiltersState) => void
  onClearFilters: () => void
  organiztaionsData: OrganizationBasicDataDto[]
  playersData: PlayerBasicDataDto[]
}

export const OrganizationPlayerAclFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  organiztaionsData,
  playersData,
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
              data={mapListDataToComboOptions(organiztaionsData)}
              name="organizationId"
              label={t('ORGANIZATION')}
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
