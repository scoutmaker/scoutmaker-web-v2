import { Field } from 'formik'
import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Autocomplete } from 'formik-mui'
import { CompetitionBasicDataDto } from '@/types/competitions'

interface ICompetitionsMultipleSelectProps {
  data: CompetitionBasicDataDto[]
  name: string
  label?: string
}

export const CompetitionsMultipleSelect = ({
  data,
  name,
  label,
}: ICompetitionsMultipleSelectProps) => (
  <Field
    name={name}
    component={Autocomplete}
    multiple
    id={name}
    options={data.map(competition => competition.id)}
    getOptionLabel={(option: string) => {
      const competition = data.find(c => c.id === option)
      if (competition) {
        return `${competition.name} (${competition.country.code})`
      }
      return 'nieznane rozgrywki'
    }}
    filterSelectedOptions
    renderInput={(params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label={label || 'competitions'}
        placeholder={label || 'competitions'}
      />
    )}
  />
)
