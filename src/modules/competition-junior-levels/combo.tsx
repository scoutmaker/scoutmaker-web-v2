import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { CompetitionJuniorLevelDto } from './types'

interface ICompJuniorLevelsComboProps
  extends IComboProps<CompetitionJuniorLevelDto> {}

export const CompetitionJuniorLevelsCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: ICompJuniorLevelsComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(item => item.id)]}
      getOptionLabel={(option: string) => {
        if (option === '') return ''

        const compJuniorLevel = data.find(c => c.id === option)
        if (compJuniorLevel) return compJuniorLevel.name

        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('COMPETITION_JUNIOR_LEVELS')}
          placeholder={label || t('COMPETITION_JUNIOR_LEVELS')}
        />
      )}
    />
  )
}
