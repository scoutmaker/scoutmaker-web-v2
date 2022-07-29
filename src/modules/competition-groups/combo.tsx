import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { CompetitionGroupBasicDataDto } from '@/modules/competition-groups/types'

import { IComboProps } from '../../types/combo'

interface ICompetitionGroupsComboProps
  extends IComboProps<CompetitionGroupBasicDataDto> {}

export const CompetitionGroupsCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: ICompetitionGroupsComboProps) => {
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
        const group = data.find(g => g.id === option)
        if (group) {
          return `${group.competition.name}, ${group.name} (${group.competition.country.code})`
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('COMPETITION_GROUPS')}
          placeholder={label || t('COMPETITION_GROUPS')}
        />
      )}
    />
  )
}
