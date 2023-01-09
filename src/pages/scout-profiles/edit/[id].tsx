import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditScoutProfileForm } from '@/modules/scout-profile/forms/edit'
import { useUpdateScoutProfile } from '@/modules/scout-profile/hooks'
import { ScoutProfileDto } from '@/modules/scout-profile/types'
import { useUsersList } from '@/modules/users/hooks'
import { getScoutProfileById } from '@/services/api/methods/scout-profiles'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<ScoutProfileDto>(
  ['common', 'scout-profiles'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getScoutProfileById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditScoutProfilePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ScoutProfileDto>) => {
  const { t } = useTranslation()

  const { mutate: updateProfile, isLoading: updateLoading } =
    useUpdateScoutProfile(data?.id || '')

  const users = useUsersList()

  const isLoading = updateLoading || users.isLoading

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('scout-profiles:EDIT_PAGE_TITLE')} />
      <EditScoutProfileForm
        current={data}
        onSubmit={updateProfile}
        usersData={users.data || []}
      />
    </>
  )
}

export default EditScoutProfilePage
