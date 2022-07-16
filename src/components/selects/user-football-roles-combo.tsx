import { Field } from 'formik'
import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'
import { UserFootballRoleDto } from '../../types/user-football-roles'
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
      options={data.map(role => role.id)}
      getOptionLabel={(option: string) => {
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
