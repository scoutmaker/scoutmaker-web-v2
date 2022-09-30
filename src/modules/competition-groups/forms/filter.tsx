import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionsCombo } from '@/modules/competitions/combo'
import { CompetitionBasicDataDto } from '@/modules/competitions/types'
import { RegionsCombo } from '@/modules/regions/combo'
import { RegionDto } from '@/modules/regions/types'

import { CompetitionGroupsFiltersDto } from '../types'

interface IFormProps {
  filters: CompetitionGroupsFiltersDto
  onFilter: (data: CompetitionGroupsFiltersDto) => void
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
            <CompetitionsCombo
              multiple
              data={competitionsData}
              name="competitionIds"
              label={t('COMPETITIONS')}
              size="small"
            />
            <RegionsCombo
              multiple
              data={regionsData}
              name="regionIds"
              label={t('REGIONS')}
              size="small"
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
