import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionAgeCategoriesCombo } from '@/modules/competition-age-categories/combo'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { CompetitionJuniorLevelsCombo } from '@/modules/competition-junior-levels/combo'
import { CompetitionJuniorLevelDto } from '@/modules/competition-junior-levels/types'
import { CompetitionTypesCombo } from '@/modules/competition-types/combo'
import { CompetitionTypeDto } from '@/modules/competition-types/types'
import { CompetitionsFiltersDto } from '@/modules/competitions/types'
import { CountriesCombo } from '@/modules/countries/combo'
import { CountryDto } from '@/modules/countries/types'

import { GendersSelect } from '../genders-select'

type IFilterFormProps = {
  filters: CompetitionsFiltersDto
  onFilter: (data: CompetitionsFiltersDto) => void
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
            <GendersSelect name="gender" label={t('GENDER')} />
            <CountriesCombo
              name="countryId"
              data={countriesData}
              label={t('COUNTRY')}
            />
            <CompetitionAgeCategoriesCombo
              name="ageCategoryId"
              data={competitionAgeCategoriesData}
              label={t('COMPETITION_AGE_CATEGORY')}
            />
            <CompetitionTypesCombo
              name="typeId"
              data={competitionTypesData}
              label={t('COMPETITION_TYPE')}
            />
            <CompetitionJuniorLevelsCombo
              name="juniorLevelId"
              data={competitionJuniorLevelsData}
              label={t('COMPETITION_JUNIOR_LEVEL')}
            />
            <FilterFormActions handleClearFilter={onClearFilters} />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
