import { TextField } from '@mui/material'
import { updatedDiff } from 'deep-object-diff'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { CompetitionJuniorLevelDto } from '@/modules/competition-junior-levels/types'
import { CompetitionTypeDto } from '@/modules/competition-types/types'
import { CountryDto } from '@/modules/countries/types'

import { getGendersComboData } from '../GendersComboData'
import { CompetitionDto, UpdateCompetitionDto } from '../types'
import {
  generateUpdateValidationSchema,
  getInitialStateFromCurrent,
} from './utils'

interface IEditFormProps {
  current: CompetitionDto
  onSubmit: (data: UpdateCompetitionDto) => void
  onCancelClick?: () => void
  fullwidth?: boolean
  competitionAgeCategoriesData: CompetitionAgeCategortyDto[]
  countriesData: CountryDto[]
  competitionTypesData: CompetitionTypeDto[]
  competitionJuniorLevelsData: CompetitionJuniorLevelDto[]
}

export const EditCompetitionForm = ({
  current,
  onSubmit,
  onCancelClick,
  fullwidth,
  competitionAgeCategoriesData,
  countriesData,
  competitionTypesData,
  competitionJuniorLevelsData,
}: IEditFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()
  const genderComboData = getGendersComboData(t)

  const initialValues = getInitialStateFromCurrent(current)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={() => generateUpdateValidationSchema()}
      enableReinitialize
      onSubmit={data => {
        const dataToSubmit = updatedDiff(
          initialValues,
          filter(data, (_, value) => value),
        )
        onSubmit(dataToSubmit)
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
            <BasicCombo
              data={mapListDataToComboOptions(competitionAgeCategoriesData)}
              name="ageCategoryId"
              label={t('COMPETITION_AGE_CATEGORY')}
              error={touched.ageCategoryId && !!errors.ageCategoryId}
              helperText={
                touched.ageCategoryId ? errors.ageCategoryId : undefined
              }
            />
            <BasicCombo
              data={mapListDataToComboOptions(countriesData)}
              name="countryId"
              label={t('COUNTRY')}
              error={touched.countryId && !!errors.countryId}
              helperText={touched.countryId ? errors.countryId : undefined}
            />
            <Field
              name="level"
              type="number"
              as={TextField}
              variant="outlined"
              fullWidth
              label={t('LEVEL')}
              error={touched.level && !!errors.level}
              helperText={touched.level && errors.level}
            />
            <BasicCombo
              data={mapListDataToComboOptions(competitionTypesData)}
              name="typeId"
              label={t('COMPETITION_TYPE')}
              error={touched.typeId && !!errors.typeId}
              helperText={touched.typeId ? errors.typeId : undefined}
            />
            <BasicCombo
              data={genderComboData}
              name="gender"
              label={t('GENDER')}
              error={touched.gender && !!errors.gender}
              helperText={touched.gender ? errors.gender : undefined}
            />
            <BasicCombo
              name="juniorLevelId"
              data={mapListDataToComboOptions(competitionJuniorLevelsData)}
              label={t('COMPETITION_JUNIOR_LEVEL')}
              error={touched.juniorLevelId && !!errors.juniorLevelId}
              helperText={
                touched.juniorLevelId ? errors.juniorLevelId : undefined
              }
            />
            <MainFormActions
              label={t('COMPETITION')}
              isEditState
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
