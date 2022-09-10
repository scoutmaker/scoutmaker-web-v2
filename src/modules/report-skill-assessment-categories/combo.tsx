import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { ReportSkillAssessmentCategoryDto } from './types'

interface ICComboProps extends IComboProps<ReportSkillAssessmentCategoryDto> { }

export const ReportSkillAssessmentCategoriesCombo = ({
  data,
  name,
  label,
  size,
  multiple,
  error,
  helperText,
}: ICComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={[0, ...data.map(role => role.id)]}
      getOptionLabel={(option: number) => {
        if (option === 0) {
          return ''
        }
        const report = data.find(r => r.id === option)
        if (report) {
          return report.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('REPORT_SKILL_ASSESSMENT_CATEGORY')}
          placeholder={label || t('REPORT_SKILL_ASSESSMENT_CATEGORY')}
        />
      )}
    />
  )
}
