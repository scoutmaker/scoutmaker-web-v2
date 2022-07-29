import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { UserFootballRoleDto } from '../../modules/user-football-roles/types'
import { IComboProps } from './types'

interface IUserFootballRolesComboProps
  extends IComboProps<UserFootballRoleDto> {}

export const UserFootballRolesCombo = ({
  data,
  name,
  label,
  size,
  multiple,
  error,
  helperText,
}: IUserFootballRolesComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={[0, ...data.map(role => role.id)]}
      getOptionLabel={(option: number) => {
        if (option === 0) {
          return ''
        }
        const role = data.find(r => r.id === option)
        if (role) {
          return role.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('FOOTBALL_ROLE')}
          placeholder={label || t('FOOTBALL_ROLE')}
        />
      )}
    />
  )
}
