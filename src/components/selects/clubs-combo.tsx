import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { ClubBasicDataDto } from '@/modules/clubs/types'

import { IComboProps } from './types'

interface IClubsComboProps extends IComboProps<ClubBasicDataDto> {}

export const ClubsCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: IClubsComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={[0, ...data.map(club => club.id)]}
      getOptionLabel={(option: number) => {
        if (option === 0) {
          return ''
        }
        const club = data.find(c => c.id === option)
        if (club) {
          return club.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('CLUB')}
          placeholder={label || t('CLUB')}
        />
      )}
    />
  )
}
