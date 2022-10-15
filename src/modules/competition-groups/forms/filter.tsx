import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { mapCompetitionsListToComboOptions } from '@/modules/competitions/utils'
import { RegionDto } from '@/modules/regions/types'

import { CompetitionGroupsFiltersState } from '../types'

interface IFormProps {
  filters: CompetitionGroupsFiltersState
  onFilter: (data: CompetitionGroupsFiltersState) => void
  onClearFilters: () => void
  competitionsData: CompetitionBasicDataDto[]
  regionsData: RegionDto[]
}

export const CompetitionGroupsFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  competitionsData,
  regionsData,
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
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              size="small"
            />
            <FilterCombo
              multiple
              data={mapCompetitionsListToComboOptions(competitionsData)}
              name="competitionIds"
              label={t('COMPETITIONS')}
              size="small"
            />
            <FilterCombo
              data={mapListDataToComboOptions(regionsData)}
              name="regionIds"
              label={t('REGIONS')}
              size="small"
              multiple
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}
