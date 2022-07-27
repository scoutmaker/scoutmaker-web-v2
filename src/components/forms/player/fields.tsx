import { TextField } from '@mui/material'
import { Field, FormikErrors, FormikTouched, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { FootedSelect } from '@/components/selects/footed-select'
import { PlayersPositionCombo } from '@/components/selects/player-positions-combo'
import { TeamsCombo } from '@/components/selects/teams-combo'
import { CreatePlayerDto, UpdatePlayerDto } from '@/modules/players/types'
import { CountryDto } from '@/types/countries'
import { PlayerPositionDto } from '@/types/player-positions'
import { TeamBasicDataDto } from '@/types/teams'

import { CountriesCombo } from '../../selects/countries-combo'

interface IFieldsProps {
  positionsData: PlayerPositionDto[]
  countriesData: CountryDto[]
  teamsData: TeamBasicDataDto[]
  editForm?: boolean
}

export const Fields = ({
  positionsData,
  countriesData,
  teamsData,
  editForm,
}: IFieldsProps) => {
  const { t } = useTranslation()

  const { touched, errors } = useFormikContext<
    CreatePlayerDto | UpdatePlayerDto
  >()

  return (
    <>
      <Field
        name="firstName"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('FIRST_NAME')}
        error={touched.firstName && !!errors.firstName}
        helperText={touched.firstName && errors.firstName}
      />
      <Field
        name="lastName"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('LAST_NAME')}
        error={touched.lastName && !!errors.lastName}
        helperText={touched.lastName && errors.lastName}
      />
      <CountriesCombo
        data={countriesData}
        name="countryId"
        label={t('COUNTRY')}
        error={touched.countryId && !!errors.countryId}
        helperText={touched.countryId ? errors.countryId : undefined}
      />
      <Field
        name="yearOfBirth"
        as={TextField}
        type="number"
        inputProps={{ min: 1970, max: 2010 }}
        variant="outlined"
        fullWidth
        label={t('YEAR_OF_BIRTH')}
        error={touched.yearOfBirth && !!errors.yearOfBirth}
        helperText={touched.yearOfBirth ? errors.yearOfBirth : undefined}
      />
      <Field
        name="height"
        as={TextField}
        type="number"
        inputProps={{ min: 140, max: 220 }}
        variant="outlined"
        fullWidth
        label={t('HEIGHT')}
        error={touched.height && !!errors.height}
        helperText={(touched.height && errors.height) || t('OPTIONAL_FIELD')}
      />
      <Field
        name="weight"
        as={TextField}
        type="number"
        inputProps={{ min: 40, max: 150 }}
        variant="outlined"
        fullWidth
        label={t('WEIGHT')}
        error={touched.weight && !!errors.weight}
        helperText={(touched.weight && errors.weight) || t('OPTIONAL_FIELD')}
      />
      <FootedSelect
        name="footed"
        error={touched.footed && !!errors.footed}
        helperText={(touched.footed && errors.footed) || t('OPTIONAL_FIELD')}
        label={t('FOOTED')}
      />
      {editForm ? null : (
        <TeamsCombo
          data={teamsData}
          name="teamId"
          label={t('players:CURRENT_TEAM')}
          error={
            (touched as FormikTouched<CreatePlayerDto>).teamId &&
            !!(errors as FormikErrors<CreatePlayerDto>).teamId
          }
          helperText={
            (touched as FormikTouched<CreatePlayerDto>).teamId
              ? (errors as FormikErrors<CreatePlayerDto>).teamId
              : undefined
          }
        />
      )}
      <PlayersPositionCombo
        data={positionsData}
        name="primaryPositionId"
        label={t('PRIMARY_POSITION')}
        error={touched.primaryPositionId && !!errors.primaryPositionId}
        helperText={
          touched.primaryPositionId ? errors.primaryPositionId : undefined
        }
      />
      <PlayersPositionCombo
        multiple
        data={positionsData}
        name="secondaryPositionIds"
        label={t('SECONDARY_POSITIONS')}
        error={touched.secondaryPositionIds && !!errors.secondaryPositionIds}
        helperText={
          touched.secondaryPositionIds
            ? errors.secondaryPositionIds
            : t('OPTIONAL_FIELD')
        }
      />
      <Field
        name="lnpId"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('LNP_ID')}
        error={touched.lnpId && !!errors.lnpId}
        helperText={(touched.lnpId && errors.lnpId) || t('OPTIONAL_FIELD')}
      />
      <Field
        name="lnpUrl"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('LNP_URL')}
        error={touched.lnpUrl && !!errors.lnpUrl}
        helperText={(touched.lnpUrl && errors.lnpUrl) || t('OPTIONAL_FIELD')}
      />
      <Field
        name="minut90id"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('90_MINUT_ID')}
        error={touched.minut90id && !!errors.minut90id}
        helperText={
          (touched.minut90id && errors.minut90id) || t('OPTIONAL_FIELD')
        }
      />
      <Field
        name="minut90url"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('90_MINUT_URL')}
        error={touched.minut90url && !!errors.minut90url}
        helperText={
          (touched.minut90url && errors.minut90url) || t('OPTIONAL_FIELD')
        }
      />
      <Field
        name="transfermarktId"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('TRANSFERMARKT_ID')}
        error={touched.transfermarktId && !!errors.transfermarktId}
        helperText={
          (touched.transfermarktId && errors.transfermarktId) ||
          t('OPTIONAL_FIELD')
        }
      />
      <Field
        name="transfermarktUrl"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('TRANSFERMARKT_URL')}
        error={touched.transfermarktUrl && !!errors.transfermarktUrl}
        helperText={
          (touched.transfermarktUrl && errors.transfermarktUrl) ||
          t('OPTIONAL_FIELD')
        }
      />
    </>
  )
}
