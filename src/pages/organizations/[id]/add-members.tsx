import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { AddOrganizationMembersForm } from '@/modules/organizations/forms/add-members'
import { useAddMemberOrganization } from '@/modules/organizations/hooks'
import { OrganizationDto } from '@/modules/organizations/types'
import { useUsersList } from '@/modules/users/hooks'
import { getOrganizationById } from '@/services/api/methods/organizations'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrganizationDto>(['common', 'organizations'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getOrganizationById(
        +(params?.id as string),
        token,
      )
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError
      }
    }
  });

const AddMembersPage = ({ data, errorMessage, errorStatus }: TSsrRole<OrganizationDto>) => {
  const { t } = useTranslation()

  const { data: users, isLoading: usersLoading } = useUsersList()
  const { mutate: addMember, isLoading: addMemberLoading } = useAddMemberOrganization()

  const isLoading = usersLoading || addMemberLoading

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('organizations:ADD_MEMBERS_PAGE_TITLE')} />
      <AddOrganizationMembersForm
        usersData={users || []}
        filterOutUsers={data.members}
        onSubmit={(formData) => {
          formData.memberIds.forEach(memberId => addMember({ memberId, organizationId: data.id }))
        }}
      />
    </>
  )
}

export default AddMembersPage
