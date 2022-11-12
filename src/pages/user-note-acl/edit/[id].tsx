import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditUserNoteAclForm } from '@/modules/user-note-acl/forms/edit'
import { useUpdateUserNoteAcl } from '@/modules/user-note-acl/hooks'
import { UserNoteAclDto } from '@/modules/user-note-acl/types'
import { getUserNoteAclById } from '@/services/api/methods/user-note-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserNoteAclDto>(
  ['common', 'user-note-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserNoteAclById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditUserNoteAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserNoteAclDto>) => {
  const { t } = useTranslation()

  const { mutate: updateUserNoteAcl, isLoading: updateLoading } =
    useUpdateUserNoteAcl(data?.id || '0')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('user-note-acl:EDIT_PAGE_TITLE')} />
      <EditUserNoteAclForm current={data} onSubmit={updateUserNoteAcl} />
    </>
  )
}

export default EditUserNoteAclPage
