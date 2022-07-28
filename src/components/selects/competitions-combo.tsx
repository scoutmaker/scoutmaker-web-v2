import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { CompetitionBasicDataDto } from '@/modules/competitions/types'

import { IComboProps } from './types'

interface ICompetitionsComboProps
  extends IComboProps<CompetitionBasicDataDto> {}

export const CompetitionsCombo = ({
  data,
  name,
  label,
  multiple,
  error,
  helperText,
  size,
}: ICompetitionsComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={[0, ...data.map(competition => competition.id)]}
      getOptionLabel={(option: number) => {
        if (option === 0) {
          return ''
        }
        const competition = data.find(c => c.id === option)
        if (competition) {
          return `${competition.name} (${competition.country.code})`
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('COMPETITIONS')}
          placeholder={label || t('COMPETITIONS')}
        />
      )}
    />
  )
}
