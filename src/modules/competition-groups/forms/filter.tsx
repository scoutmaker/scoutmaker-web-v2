import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Combo } from '@/components/combo/combo'
import { mapGenericNameToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
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
            <Combo
              multiple
              data={mapCompetitionsListToComboOptions(competitionsData)}
              name="competitionIds"
              label={t('COMPETITIONS')}
              size="small"
            />
            <Combo
              data={mapGenericNameToComboOptions(regionsData)}
              name="regionIds"
              label={t('REGIONS')}
              size="small"
              multiple
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
