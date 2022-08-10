import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '../../types/combo'
import { CompetitionAgeCategortyDto } from './types'

interface ICompAgeCategComboProps
  extends IComboProps<CompetitionAgeCategortyDto> { }

export const CompetitionAgeCategoriesCombo = ({
  data,
  name,
  label,
  multiple,
  error,
  helperText,
  size,
}: ICompAgeCategComboProps) => {
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

        const compAgeCateg = data.find(c => c.id === option)
        if (compAgeCateg)
          return compAgeCateg.name

        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('COMPETITION_AGE_CATEGORIES')}
          placeholder={label || t('COMPETITION_AGE_CATEGORIES')}
        />
      )}
    />
  )
}
