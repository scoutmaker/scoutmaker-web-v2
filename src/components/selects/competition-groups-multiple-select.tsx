import { Field } from 'formik'
import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Autocomplete } from 'formik-mui'
import { CompetitionGroupBasicDataDto } from '@/types/competition-groups'

interface ICompetitionGroupsMultipleSelectProps {
  data: CompetitionGroupBasicDataDto[]
  name: string
  label?: string
}

export const CompetitionGroupsMultipleSelect = ({
  data,
  name,
  label,
}: ICompetitionGroupsMultipleSelectProps) => (
  <Field
    name={name}
    component={Autocomplete}
    multiple
    id={name}
    options={data.map(competition => competition.id)}
    getOptionLabel={(option: string) => {
      const group = data.find(g => g.id === option)
      if (group) {
        return `${group.competition.name}, ${group.name} (${group.competition.country.code})`
      }
      return 'nieznana grupa'
    }}
    filterSelectedOptions
    renderInput={(params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={label || 'groups'}
        placeholder={label || 'groups'}
      />
    )}
  />
)
