import { TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { Container } from '@/components/forms/container'
import { MainFormActions } from '@/components/forms/main-form-actions'
import { useAlertsState } from '@/context/alerts/useAlertsState'
import { ReportTemplatesCombo } from '@/modules/report-templates/combo'
import { useReportTemplatesList } from '@/modules/report-templates/hooks'
import { ReportTemplateBasicDataDto } from '@/modules/report-templates/types'
import { CreateReportDto, TStep } from '@/modules/reports/types'

interface ICreateFormProps {
  onSubmit: (data: CreateReportDto) => void
  onCancelClick?: () => void
  templatesData: ReportTemplateBasicDataDto[]
  fullwidth?: boolean
}

export const CreateReportForm = ({
  onSubmit,
  onCancelClick,
  fullwidth,
  templatesData,
}: ICreateFormProps) => {
  const { setAlert } = useAlertsState()
  const { t } = useTranslation()

  const steps: TStep[] = [
    {
      title: t('REPORT_TEMPLATE'),
      content:
        templatesData.length > 0 ? (
          <ReportTemplatesCombo data={templatesData} name="template" />
        ) : (
          <p>{t('reports:PICK_REPORT_TEMPLATE')}</p>
        ),
    },
  ]

  return (
    <Formik
      initialValues={{}}
      // validationSchema={generateCreateFormValidationSchema(t)}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        const dataToSubmit = filter(data, (_, value) => value)
        onSubmit(dataToSubmit as CreateReportDto)
        resetForm()
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Container fullwidth={fullwidth}>
            <MainFormActions
              label={t('REPORT')}
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick()
                }
                handleReset()
                setAlert({ msg: t('CHANGES_CANCELLED'), type: 'warning' })
              }}
            />
          </Container>
        </Form>
      )}
    </Formik>
  )
}
