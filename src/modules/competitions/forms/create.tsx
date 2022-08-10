import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionAgeCategoriesCombo } from '@/modules/competition-age-categories/combot'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { CompetitionJuniorLevelsCombo } from '@/modules/competition-junior-levels/combo'
import { CompetitionJuniorLevelDto } from '@/modules/competition-junior-levels/types'
import { CompetitionTypesCombo } from '@/modules/competition-types/combo'
import { CompetitionTypeDto } from '@/modules/competition-types/types'
import { CountriesCombo } from '@/modules/countries/combo'
import { CountryDto } from '@/modules/countries/types'

import { GendersCombo } from '../genders-combo'
import { CreateCompetitonDto } from '../types'
import { generateCreateValidationSchema, initialValues } from './utils'

interface ICreateFormProps {
  onSubmit: (data: CreateCompetitonDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  competitionAgeCategoriesData: CompetitionAgeCategortyDto[]
  countriesData: CountryDto[]
  competitionTypesData: CompetitionTypeDto[]
  competitionJuniorLevelsData: CompetitionJuniorLevelDto[]
}

export const CreateCompetitionForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  competitionAgeCategoriesData,
  countriesData,
  competitionTypesData,
  competitionJuniorLevelsData
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateCreateValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateCompetitonDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('NAME')}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <CompetitionAgeCategoriesCombo
              data={competitionAgeCategoriesData}
              name='ageCategoryId'
              label={t('COMPETITION_AGE_CATEGORY')}
              error={touched.ageCategoryId && !!errors.ageCategoryId}
              helperText={touched.ageCategoryId ? errors.ageCategoryId : undefined}
            />
            <CountriesCombo
              data={countriesData}
              name='countryId'
              label={t('COUNTRY')}
              error={touched.countryId && !!errors.countryId}
              helperText={touched.countryId ? errors.countryId : undefined}
            />
            <Field
              name="level"
              type='number'
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('LEVEL')} // ADD_TRANS
              error={touched.level && !!errors.level}
              helperText={touched.level && errors.level}
            />
            <CompetitionTypesCombo
              data={competitionTypesData}
              name='typeId'
              label={t('COMPETITION_TYPE')} // ADD_TRANS
              error={touched.typeId && !!errors.typeId}
              helperText={touched.typeId ? errors.typeId : undefined}
            />
            <GendersCombo
              name='gender'
              label={t('GENDER')} // ADD_TRANS
              error={touched.gender && !!errors.gender}
              helperText={touched.gender ? errors.gender : undefined}
            />
            <CompetitionJuniorLevelsCombo
              name='juniorLevelId'
              data={competitionJuniorLevelsData}
              label={t('COMPETITION_JUNIOR_LEVEL')} // ADD_TRANS
              error={touched.juniorLevelId && !!errors.juniorLevelId}
              helperText={touched.juniorLevelId ? errors.juniorLevelId : undefined}
            />
            <MainFormActions
              label={t('COMPETITION')}
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick()
                }
                handleReset()
                setAlert({ msg: t('CHANGES_CANCELLED'), type: 'warning' })
              }}
            />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
