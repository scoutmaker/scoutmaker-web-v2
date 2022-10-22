import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { mapListDataToComboOptions } from '@/components/combo/utils'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { NoteBasicDataDto } from '@/modules/notes/types'
import { mapNotesListToComboOptions } from '@/modules/notes/utils'
import { OrganizationBasicDataDto } from '@/modules/organizations/types'

import { OrganizationNoteAclFiltersState } from '../types'

interface IFormProps {
  filters: OrganizationNoteAclFiltersState
  onFilter: (data: OrganizationNoteAclFiltersState) => void
  onClearFilters: () => void
  organizationsData: OrganizationBasicDataDto[]
  notesData: NoteBasicDataDto[]
}

export const OrganizationNoteAclFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  notesData,
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
              name="organizationId"
              data={mapListDataToComboOptions(organizationsData)}
              label={t('ORGANIZATION')}
              size="small"
            />
            <FilterCombo
              name="noteId"
              data={mapNotesListToComboOptions(notesData)}
              label={t('NOTE')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}
