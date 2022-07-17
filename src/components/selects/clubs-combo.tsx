import { Field } from 'formik'
import { TextField, AutocompleteRenderInputParams } from '@mui/material'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'
import { ClubBasicDataDto } from '../../types/clubs'
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
      options={data.map(club => club.id)}
      getOptionLabel={(option: string) => {
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
