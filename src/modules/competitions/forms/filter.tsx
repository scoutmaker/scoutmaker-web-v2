import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { CompetitionJuniorLevelDto } from '@/modules/competition-junior-levels/types'
import { CompetitionTypeDto } from '@/modules/competition-types/types'
import { CompetitionsFiltersState } from '@/modules/competitions/types'
import { CountryDto } from '@/modules/countries/types'

import { GendersSelect } from '../genders-select'

type IFilterFormProps = {
  filters: CompetitionsFiltersState
  onFilter: (data: CompetitionsFiltersState) => void
  onClearFilters: () => void
  competitionAgeCategoriesData: CompetitionAgeCategortyDto[]
  countriesData: CountryDto[]
  competitionTypesData: CompetitionTypeDto[]
  competitionJuniorLevelsData: CompetitionJuniorLevelDto[]
}

export const CompetitionsFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  competitionAgeCategoriesData,
  countriesData,
  competitionTypesData,
  competitionJuniorLevelsData,
}: IFilterFormProps) => {
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
            <Field
              name="level"
              type="number"
              as={TextField}
              variant="outlined"
              fullWidth
              label={`${t('LEVEL')} 1-15`}
              size="small"
              inputProps={{ min: 1, max: 15, step: 1, pattern: '[1-9]|1[0-5]' }}
            />
            <GendersSelect name="gender" label={t('GENDER')} size="small" />
            <FilterCombo
              name="countryId"
              data={mapListDataToComboOptions(countriesData)}
              label={t('COUNTRY')}
              size="small"
            />
            <FilterCombo
              name="ageCategoryId"
              data={mapListDataToComboOptions(competitionAgeCategoriesData)}
              label={t('COMPETITION_AGE_CATEGORY')}
              size="small"
            />
            <FilterCombo
              name="typeId"
              data={mapListDataToComboOptions(competitionTypesData)}
              label={t('COMPETITION_TYPE')}
              size="small"
            />
            <FilterCombo
              name="juniorLevelId"
              data={mapListDataToComboOptions(competitionJuniorLevelsData)}
              label={t('COMPETITION_JUNIOR_LEVEL')}
              size="small"
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
