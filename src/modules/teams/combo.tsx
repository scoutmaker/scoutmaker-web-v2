import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { TeamBasicDataDto } from './types'

interface ITeamsComboProps extends IComboProps<TeamBasicDataDto> {}

export const TeamsCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: ITeamsComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(team => team.id)]}
      getOptionLabel={(option: string) => {
        if (option === '') {
          return ''
        }
        const team = data.find(c => c.id === option)
        if (team) {
          return team.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('TEAM')}
          placeholder={label || t('TEAM')}
        />
      )}
    />
  )
}
