import { useField } from 'formik'
import { TextField, Autocomplete } from '@mui/material'
import { UserFootballRoleDto } from '../../types/user-football-roles'

interface IUserFootballRolesComboProps {
  userFootballRolesData: UserFootballRoleDto[]
  name: string
  label: string
  size?: 'medium' | 'small'
}

export const UserFootballRolesCombo = ({
  userFootballRolesData,
  name,
  label,
  size,
}: IUserFootballRolesComboProps) => {
  const [field, fieldMeta, fieldHelpers] = useField(name)

  const { value } = field
  const { error, touched } = fieldMeta
  const { setValue } = fieldHelpers

  return (
    <Autocomplete
      id={name}
      {...field}
      onChange={(_, newValue: string | null) => {
        setValue(newValue)
      }}
      value={value}
      options={['', ...userFootballRolesData.map(role => role.id)]}
      disableClearable
      getOptionLabel={option => {
        const selected = userFootballRolesData.find(role => role.id === option)
        if (selected) {
          return selected.name
        }
        return 'brak'
      }}
      renderOption={(props, option) => {
        const selected = userFootballRolesData.find(role => role.id === option)
        return (
          <li {...props} key={option.id}>
            {selected?.name || 'brak'}
          </li>
        )
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={touched && !!error}
          helperText={touched && error}
        />
      )}
      size={size}
    />
  )
}
