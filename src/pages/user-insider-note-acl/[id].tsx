import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { UserInsiderNoteAclDetailsCard } from '@/modules/user-insider-note-acl/details-card'
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

const UserInsiderNoteAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserInsiderNoteAclDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('USER_INSIDER_NOTE_ACE')} />
      <UserInsiderNoteAclDetailsCard data={data} />
    </>
  )
}

export default UserInsiderNoteAclPage
