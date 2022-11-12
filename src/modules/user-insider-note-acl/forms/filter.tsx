import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'

import { FilterCombo } from '@/components/combo/combo'
import { FilterFormActions } from '@/components/forms/filter-form-actions'
import { FilterFormContainer } from '@/components/forms/filter-form-container'
import { InsiderNoteBasicDataDto } from '@/modules/insider-notes/types'
import { mapInsiderNotesListToComboOptions } from '@/modules/insider-notes/utils'
import { UserBasicDataDto } from '@/modules/users/types'
import { mapUsersListToComboOptions } from '@/modules/users/utils'

import { UserInsiderNoteAclFiltersState } from '../types'

interface IFormProps {
  filters: UserInsiderNoteAclFiltersState
  onFilter: (data: UserInsiderNoteAclFiltersState) => void
  onClearFilters: () => void
  usersData: UserBasicDataDto[]
  insiderNotesData: InsiderNoteBasicDataDto[]
}

export const UserInsiderNoteAclFilterForm = ({
  filters,
  onFilter,
  onClearFilters,
  insiderNotesData,
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
              data={mapInsiderNotesListToComboOptions(insiderNotesData)}
              name="insiderNoteId"
              label={t('INSIDER_NOTE')}
              size="small"
            />
          </FilterFormContainer>
          <FilterFormActions handleClearFilter={onClearFilters} />
        </Form>
      )}
    </Formik>
  )
}
