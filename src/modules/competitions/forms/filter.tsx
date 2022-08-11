import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { CompetitionAgeCategoriesCombo } from '@/modules/competition-age-categories/combot'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { CompetitionJuniorLevelsCombo } from '@/modules/competition-junior-levels/combo'
import { CompetitionJuniorLevelDto } from '@/modules/competition-junior-levels/types'
import { CompetitionTypesCombo } from '@/modules/competition-types/combo'
import { CompetitionTypeDto } from '@/modules/competition-types/types'
import { CompetitionsFiltersDto } from '@/modules/competitions/types'
import { CountriesCombo } from '@/modules/countries/combo'
import { CountryDto } from '@/modules/countries/types'

import { GendersCombo } from '../genders-combo'

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
  competitionJuniorLevelsData
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
              type='number'
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('LEVEL')}
              size="small"
            />
            <GendersCombo
              name='gender'
              label={t('GENDER')}
            />
            <CountriesCombo
              name="countryId"
              data={countriesData}
              label={t('COUNTRY')}
            />
            <CompetitionAgeCategoriesCombo
              name='ageCategoryId'
              data={competitionAgeCategoriesData}
              label={t('COMPETITION_AGE_CATEGORY')}
            />
            <CompetitionTypesCombo
              name='typeId'
              data={competitionTypesData}
              label={t('COMPETITION_TYPE')}
            />
            <CompetitionJuniorLevelsCombo
              name='juniorLevelId'
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
