import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { ReportSkillAssessmentTemplateDto } from './types'

interface IRSATComboProps extends IComboProps<ReportSkillAssessmentTemplateDto> { }

export const ReportSkillAssessmentTemplatesCombo = ({
  data,
  name,
  label,
  size,
  multiple,
  error,
  helperText,
}: IRSATComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(s => s.id)]}
      getOptionLabel={(option: string) => {
        if (option === '')
          return ''

        const template = data.find(s => s.id === option)
        if (template)
          return `${template.name} (${template.category.name})`

        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('REPORT_SKILL_ASSESSMENT_TEMPLATE')}
          placeholder={label || t('REPORT_SKILL_ASSESSMENT_TEMPLATE')}
        />
      )}
    />
  )
}
