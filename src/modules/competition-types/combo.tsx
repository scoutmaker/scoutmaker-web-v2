import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { CompetitionTypeDto } from './types'

interface ICompTypesComboProps extends IComboProps<CompetitionTypeDto> { }

export const CompetitionTypesCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: ICompTypesComboProps) => {
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

        const compType = data.find(c => c.id === option)
        if (compType)
          return compType.name

        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('COMPETITON_TYPES')} // ADD_TRANS
          placeholder={label || t('COMPETITON_TYPES')}
        />
      )}
    />
  )
}
