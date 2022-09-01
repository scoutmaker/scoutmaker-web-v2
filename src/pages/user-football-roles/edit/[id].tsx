import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditUserFootballRoleForm } from '@/modules/user-football-roles/forms/edit'
import { useUpdateUserFootballRole } from '@/modules/user-football-roles/hooks'
import { UserFootballRoleDto } from '@/modules/user-football-roles/types'
import { getUserFootballRoleById } from '@/services/api/methods/user-football-roles'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserFootballRoleDto>(['common', 'user-football-roles'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserFootballRoleById(
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

const EditUserFootballRolePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserFootballRoleDto>) => {
  const { t } = useTranslation()

  const { mutate: updateRole, isLoading: updateLoading } = useUpdateUserFootballRole(
    data?.id || 0,
  )

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading
        title={t('user-football-roles:EDIT_PAGE_TITLE')}
      />
      <EditUserFootballRoleForm
        current={data}
        onSubmit={updateRole}
      />
    </>
  )
}

export default EditUserFootballRolePage
