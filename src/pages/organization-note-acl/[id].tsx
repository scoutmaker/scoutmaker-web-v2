import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrganizationNoteAclDetailsCard } from '@/modules/organization-note-acl/details-card'
import { OrganizationNoteAclDto } from '@/modules/organization-note-acl/types'
import { getOrganizationNoteAclById } from '@/services/api/methods/organization-note-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrganizationNoteAclDto>(
  ['common', 'organization-note-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getOrganizationNoteAclById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const OrganizationNoteAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationNoteAclDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('ORGANIZATION_NOTE_ACE')} />
      <OrganizationNoteAclDetailsCard data={data} />
    </>
  )
}

export default OrganizationNoteAclPage
