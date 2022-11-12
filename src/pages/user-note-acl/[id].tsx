import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { UserNoteAclDetailsCard } from '@/modules/user-note-acl/details-card'
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

const UserNoteAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserNoteAclDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('USER_NOTE_ACE')} />
      <UserNoteAclDetailsCard data={data} />
    </>
  )
}

export default UserNoteAclPage
