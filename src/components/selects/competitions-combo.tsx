import { Field } from 'formik'
import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Autocomplete } from 'formik-mui'
import { CompetitionBasicDataDto } from '@/types/competitions'
import { useTranslation } from 'next-i18next'
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
      options={data.map(competition => competition.id)}
      getOptionLabel={(option: string) => {
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
