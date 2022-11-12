import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { InsiderNoteBasicDataDto } from '@/modules/insider-notes/types'
import { mapInsiderNotesListToComboOptions } from '@/modules/insider-notes/utils'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'

import { OrganizationInsiderNoteAclFiltersState } from '../types'

interface IFormProps {
  filters: OrganizationInsiderNoteAclFiltersState
  onFilter: (data: OrganizationInsiderNoteAclFiltersState) => void
  onClearFilters: () => void
  organizationsData: OrganizationBasicDataDto[]
  insiderNotesData: InsiderNoteBasicDataDto[]
}

export const OrganizationInsiderNoteAclFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  insiderNotesData,
  organizationsData,
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
              data={mapInsiderNotesListToComboOptions(insiderNotesData)}
              label={t('INSIDER_NOTE')}
              name="insiderNoteId"
              size="small"
            />
            <FilterCombo
              data={mapListDataToComboOptions(organizationsData)}
              label={t('ORGANIZATION')}
              name="organizationId"
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}
