import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'
import { ReportBasicDataDto } from '@/modules/reports/types'
import { mapReportsListToComboOptions } from '@/modules/reports/utils'

import { OrganizationReportAclFiltersState } from '../types'

interface IFormProps {
  filters: OrganizationReportAclFiltersState
  onFilter: (data: OrganizationReportAclFiltersState) => void
  onClearFilters: () => void
  organizationsData: OrganizationBasicDataDto[]
  reportsData: ReportBasicDataDto[]
}

export const OrganizationReportAclFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  organizationsData,
  reportsData,
}: IFormProps) => {
  const { t } = useTranslation()

  return (
    <Formik
      initialValues={filters}
      onSubmit={(data, form) => {
        onFilter(data)
        form.setSubmitting(false)
      }}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <FilterFormContainer>
            <FilterCombo
              data={mapReportsListToComboOptions(reportsData)}
              name="reportId"
              label={t('REPORT')}
              size="small"
            />
            <FilterCombo
              data={mapListDataToComboOptions(organizationsData)}
              name="organizationId"
              label={t('ORGANIZATION')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}
