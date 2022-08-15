import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'
import { formatDate } from '@/utils/format-date'

import { MatchBasicDataDto } from './types'

interface IMatchesComboProps extends IComboProps<MatchBasicDataDto> { }

export const MatchesCombo = ({
  data,
  name,
  label,
  size,
  multiple,
  error,
  helperText,
}: IMatchesComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={[0, ...data.map(item => item.id)]}
      getOptionLabel={(option: number) => {
        if (option === 0) return ''

        const match = data.find(s => s.id === option)
        if (match)
          return `${formatDate(match.date)} ${match.homeTeam.name} - ${match.awayTeam.name}`

        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('MATCH')}
          placeholder={label || t('MATCH')}
        />
      )}
    />
  )
}
