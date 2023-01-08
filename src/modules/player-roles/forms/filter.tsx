import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { PlayerPositionTypeDto } from '@/modules/player-position-types/types'
import { mapPlayerPositionTypesToComboOptions } from '@/modules/player-position-types/utils'

import { PlayerRolesFiltersState } from '../types'

interface IFilterFormProps {
  filters: PlayerRolesFiltersState
  positionTypesData: PlayerPositionTypeDto[]
  onFilter: (data: PlayerRolesFiltersState) => void
  onClearFilters: () => void
}

export const PlayerRolesFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  positionTypesData,
}: IFilterFormProps) => {
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
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              size="small"
            />
            <Field
              name="altName"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('ALT_NAME')}
              size="small"
            />
            <FilterCombo
              name="positionTypeIds"
              data={mapPlayerPositionTypesToComboOptions(positionTypesData)}
              label={t('POSITION_TYPES')}
              multiple
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}
