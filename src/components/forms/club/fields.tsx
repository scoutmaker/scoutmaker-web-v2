import { TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { CreateClubDto, UpdateClubDto } from '../../../types/clubs'
import { CountryDto } from '../../../types/countries'
import { RegionDto } from '../../../types/regions'
import { CountriesCombo } from '../../selects/countries-combo'
import { RegionsCombo } from '../../selects/regions-combo'

interface IFieldsProps {
  regionsData: RegionDto[]
  countriesData: CountryDto[]
}

export const Fields = ({ regionsData, countriesData }: IFieldsProps) => {
  const { t } = useTranslation()
  const { touched, errors } = useFormikContext<CreateClubDto | UpdateClubDto>()

  return (
    <>
      <Field
        name="name"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('NAME')}
        error={touched.name && !!errors.name}
        helperText={touched.name && errors.name}
      />
      <CountriesCombo data={countriesData} name="countryId" />
      <RegionsCombo data={regionsData} name="regionId" />
      <Field
        name="lnpID"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('LNP_ID')}
        error={touched.lnpId && !!errors.lnpId}
        helperText={(touched.lnpId && errors.lnpId) || t('OPTIONAL_FIELD')}
      />
      <Field
        name="city"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('CITY')}
        error={touched.city && !!errors.city}
        helperText={(touched.city && errors.city) || t('OPTIONAL_FIELD')}
      />
      <Field
        name="postalCode"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('POSTAL_CODE')}
        error={touched.postalCode && !!errors.postalCode}
        helperText={
          (touched.postalCode && errors.postalCode) || t('OPTIONAL_FIELD')
        }
      />
      <Field
        name="street"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('STREET')}
        error={touched.street && !!errors.street}
        helperText={(touched.street && errors.street) || t('OPTIONAL_FIELD')}
      />
      <Field
        name="website"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('WEBSITE_URL')}
        error={touched.website && !!errors.website}
        helperText={(touched.website && errors.website) || t('OPTIONAL_FIELD')}
      />
      <Field
        name="twitter"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('TWITTER_URL')}
        error={touched.twitter && !!errors.twitter}
        helperText={(touched.twitter && errors.twitter) || t('OPTIONAL_FIELD')}
      />
      <Field
        name="facebook"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('FACEBOOK_URL')}
        error={touched.facebook && !!errors.facebook}
        helperText={
          (touched.facebook && errors.facebook) || t('OPTIONAL_FIELD')
        }
      />
      <Field
        name="instagram"
        as={TextField}
        variant="outlined"
        fullWidth
        label={t('INSTAGRAM_URL')}
        error={touched.instagram && !!errors.instagram}
        helperText={
          (touched.instagram && errors.instagram) || t('OPTIONAL_FIELD')
        }
      />
    </>
  )
}
