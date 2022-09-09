import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { UserBasicDataDto } from './types'

interface IUserComboProps extends IComboProps<UserBasicDataDto> {
  filterOut?: UserBasicDataDto[]
}

export const UsersCombo = ({
  data,
  name,
  label,
  size,
  multiple,
  error,
  helperText,
  filterOut
}: IUserComboProps) => {
  const { t } = useTranslation()
  let members = data;
  if (filterOut) members = data.filter(user => !filterOut.find(u => u.id === user.id))

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={[0, ...members.map(user => user.id)]}
      getOptionLabel={(option: number) => {
        if (option === 0)
          return ''

        const user = members.find(u => u.id === option)
        if (user)
          return `${user.firstName} ${user.lastName}`

        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('USER')}
          placeholder={label || t('USER')}
        />
      )}
    />
  )
}
