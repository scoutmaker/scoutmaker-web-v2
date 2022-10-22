import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditUserInsiderNoteAclForm } from '@/modules/user-insider-note-acl/forms/edit'
import { useUpdateUserInsiderNoteAcl } from '@/modules/user-insider-note-acl/hooks'
import { UserInsiderNoteAclDto } from '@/modules/user-insider-note-acl/types'
import { getUserInsiderNoteAclById } from '@/services/api/methods/user-insider-note-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserInsiderNoteAclDto>(
  ['common', 'user-insider-note-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserInsiderNoteAclById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditUserInsiderNoteAClPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserInsiderNoteAclDto>) => {
  const { t } = useTranslation()

  const { mutate: updateUserInsiderNoteAcl, isLoading: updateLoading } =
    useUpdateUserInsiderNoteAcl(data?.id || '0')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('user-insider-note-acl:EDIT_PAGE_TITLE')} />
      <EditUserInsiderNoteAclForm
        current={data}
        onSubmit={updateUserInsiderNoteAcl}
      />
    </>
  )
}

export default EditUserInsiderNoteAClPage
