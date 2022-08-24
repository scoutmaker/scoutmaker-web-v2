import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { ReportTemplateBasicDataDto } from '@/modules/report-templates/types'

import { IComboProps } from '../../types/combo'

interface IReportTemplatesComboProps
  extends IComboProps<ReportTemplateBasicDataDto> {}

export const ReportTemplatesCombo = ({
  data,
  name,
  label,
  multiple,
  error,
  helperText,
  size,
}: IReportTemplatesComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={[0, ...data.map(template => template.id)]}
      getOptionLabel={(option: number) => {
        if (option === 0) {
          return ''
        }
        const selected = data.find(template => template.id === option)
        if (selected) {
          return selected.name
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('REPORT_TEMPLATES')}
          placeholder={label || t('REPORT_TEMPLATES')}
        />
      )}
    />
  )
}
