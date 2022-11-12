import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrganizationInsiderNoteAclDetailsCard } from '@/modules/organization-insider-note-acl/details-card'
import { OrganizationInsiderNoteAclDto } from '@/modules/organization-insider-note-acl/types'
import { getOrganizationInsiderNoteAclById } from '@/services/api/methods/organization-insider-note-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps =
  withSessionSsrRole<OrganizationInsiderNoteAclDto>(
    ['common', 'organization-insider-note-acl', 'permissions'],
    ['ADMIN'],
    async (token, params) => {
      try {
        const data = await getOrganizationInsiderNoteAclById(
          params?.id as string,
          token,
        )
        return { data }
      } catch (error) {
        return {
          data: null,
          error: error as ApiError,
        }
      }
    },
  )

const OrganizationInsiderNoteAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationInsiderNoteAclDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('ORGANIZATION_INSIDER_NOTE_ACE')} />
      <OrganizationInsiderNoteAclDetailsCard data={data} />
    </>
  )
}

export default OrganizationInsiderNoteAclPage
