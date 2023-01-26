import { TextField } from '@mui/material'
import { Field, FormikErrors, FormikTouched, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { CountryDto } from '@/modules/countries/types'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { PlayerRoleDto } from '@/modules/player-roles/types'
import { CreatePlayerDto, UpdatePlayerDto } from '@/modules/players/types'
import { TeamBasicDataDto } from '@/modules/teams/types'

import { getFootedComboData } from '../footed-select'

interface IFieldsProps {
  positionsData: PlayerPositionDto[]
  countriesData: CountryDto[]
  teamsData: TeamBasicDataDto[]
  playerRolesData: PlayerRoleDto[]
  editForm?: boolean
  showRoleField: boolean
}

export const Fields = ({
  positionsData,
  countriesData,
  teamsData,
  editForm,
  showRoleField,
  playerRolesData,
}: IFieldsProps) => {
  const { t } = useTranslation()
  const footedComboData = getFootedComboData(t)

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
      <BasicCombo
        data={mapListDataToComboOptions(countriesData)}
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
      <BasicCombo
        data={footedComboData}
        name="footed"
        error={touched.footed && !!errors.footed}
        helperText={(touched.footed && errors.footed) || t('OPTIONAL_FIELD')}
        label={t('FOOTED')}
      />
      {editForm ? null : (
        <BasicCombo
          data={mapListDataToComboOptions(teamsData)}
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
      <BasicCombo
        data={mapListDataToComboOptions(positionsData)}
        name="primaryPositionId"
        label={t('PRIMARY_POSITION')}
        error={touched.primaryPositionId && !!errors.primaryPositionId}
        helperText={
          touched.primaryPositionId ? errors.primaryPositionId : undefined
        }
      />
      <BasicCombo
        multiple
        data={mapListDataToComboOptions(positionsData)}
        name="secondaryPositionIds"
        label={t('SECONDARY_POSITIONS')}
        error={touched.secondaryPositionIds && !!errors.secondaryPositionIds}
        helperText={
          touched.secondaryPositionIds
            ? errors.secondaryPositionIds
            : t('OPTIONAL_FIELD')
        }
      />
      {showRoleField && (
        <BasicCombo
          data={mapListDataToComboOptions(playerRolesData)}
          name="roleId"
          label={t('PLAYER_ROLE')}
          error={touched.roleId && !!errors.roleId}
          helperText={touched.roleId ? errors.roleId : t('OPTIONAL_FIELD')}
        />
      )}
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
      <Field
        name="inStatUrl"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('INSTAT_URL')}
        error={touched.inStatUrl && !!errors.inStatUrl}
        helperText={
          (touched.inStatUrl && errors.inStatUrl) || t('OPTIONAL_FIELD')
        }
      />
    </>
  )
}
