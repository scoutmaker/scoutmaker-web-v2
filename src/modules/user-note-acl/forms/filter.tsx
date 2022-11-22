import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { NoteBasicDataDto } from '@/modules/notes/types'
import { mapNotesListToComboOptions } from '@/modules/notes/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { UserNoteAclFiltersState } from '../types'

interface IFormProps {
  filters: UserNoteAclFiltersState
  onFilter: (data: UserNoteAclFiltersState) => void
  onClearFilters: () => void
  usersData: UserBasicDataDto[]
  notesData: NoteBasicDataDto[]
}

export const UserNoteAclFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  notesData,
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
              data={mapNotesListToComboOptions(notesData)}
              name="noteId"
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
