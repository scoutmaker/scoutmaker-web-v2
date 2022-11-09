import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { ReportBasicDataDto } from '@/modules/reports/types'
import { mapReportsListToComboOptions } from '@/modules/reports/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { UserReportAclFiltersState } from '../types'

interface IFormProps {
  filters: UserReportAclFiltersState
  onFilter: (data: UserReportAclFiltersState) => void
  onClearFilters: () => void
  usersData: UserBasicDataDto[]
  reportsData: ReportBasicDataDto[]
}

export const UserReportAclFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  reportsData,
  usersData,
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
              data={mapUsersListToComboOptions(usersData)}
              name="userId"
              label={t('USER')}
              size="small"
            />
            <FilterCombo
              data={mapReportsListToComboOptions(reportsData)}
              name="reportId"
              label={t('REPORT')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}
