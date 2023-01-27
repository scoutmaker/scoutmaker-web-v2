import { Button } from '@mui/material'
import { Form, Formik } from 'formik'
import filter from 'just-filter-object'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { Container } from '@/components/forms/container'
import { ReportBgImageDto } from '@/modules/report-background-images/types'
import { ReportTemplateBasicDataDto } from '@/modules/report-templates/types'
import { UserDto } from '@/modules/users/types'
import { ConfirmOnLeaveForm } from '@/utils/hooks/use-confirm-leave'

import { SettingsDto } from '../types'
import { generateValidationSchema, getInitialStateFromCurrent } from './utils'

interface IFormProps {
  onSubmit: (data: SettingsDto) => void
  fullwidth?: boolean
  reportTemplatesData: ReportTemplateBasicDataDto[]
  reportBackgroundImagesData: ReportBgImageDto[]
  user: UserDto | undefined
}

export const SettingsFormForm = ({
  onSubmit,
  fullwidth,
  user,
  reportTemplatesData,
  reportBackgroundImagesData,
}: IFormProps) => {
  const { t } = useTranslation()

  const initialValues = getInitialStateFromCurrent(user)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={generateValidationSchema}
      enableReinitialize
      onSubmit={data => {
        const filtered = filter(data, (_, value) => value)
        if (data.reportBackgroundImageId === '') {
          // @ts-ignore
          filtered.reportBackgroundImageId = null
        }
        if (data.reportTemplateId === '') {
          // @ts-ignore
          filtered.reportTemplateId = null
        }
        onSubmit(filtered)
      }}
    >
      {({ touched, errors }) => (
        <Form>
          <ConfirmOnLeaveForm />
          <Container fullwidth={fullwidth}>
            <BasicCombo
              data={mapListDataToComboOptions(reportTemplatesData)}
              name="reportTemplateId"
              label={t('settings:DEF_REPORT_TEMPLATE')}
              error={touched.reportTemplateId && !!errors.reportTemplateId}
              helperText={
                touched.reportTemplateId ? errors.reportTemplateId : undefined
              }
            />
            <BasicCombo
              data={mapListDataToComboOptions(reportBackgroundImagesData)}
              name="reportBackgroundImageId"
              label={t('settings:DEF_REPORT_BG')}
              error={
                touched.reportBackgroundImageId &&
                !!errors.reportBackgroundImageId
              }
              helperText={
                touched.reportBackgroundImageId
                  ? errors.reportBackgroundImageId
                  : undefined
              }
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              {t('settings:SUBMIT')}
            </Button>
          </Container>
        </Form>
      )}
    </Formik>
  )
}
