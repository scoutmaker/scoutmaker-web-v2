import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditUserPlayerAclForm } from '@/modules/user-player-acl/forms/edit'
import { useUpdateUserPlayerAcl } from '@/modules/user-player-acl/hooks'
import { UserPlayerAclDto } from '@/modules/user-player-acl/types'
import { getUserPlayerAclById } from '@/services/api/methods/user-player-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserPlayerAclDto>(
  ['common', 'user-player-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserPlayerAclById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditUserPlayerAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserPlayerAclDto>) => {
  const { t } = useTranslation()

  const { mutate: updateAcl, isLoading: updateLoading } =
    useUpdateUserPlayerAcl(data?.id || '0')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('user-player-acl:EDIT_PAGE_TITLE')} />
      <EditUserPlayerAclForm current={data} onSubmit={updateAcl} />
    </>
  )
}

export default EditUserPlayerAclPage
