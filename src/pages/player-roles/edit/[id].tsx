import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { usePlayerPositionTypesList } from '@/modules/player-position-types/hooks'
import { EditPlayerRoleForm } from '@/modules/player-roles/forms/edit'
import { useUpdatePlayerRole } from '@/modules/player-roles/hooks'
import { PlayerRoleDto } from '@/modules/player-roles/types'
import { getPlayerRoleById } from '@/services/api/methods/player-roles'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<PlayerRoleDto>(
  ['common', 'player-roles'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getPlayerRoleById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditPlayerRolePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<PlayerRoleDto>) => {
  const { t } = useTranslation()

  const { mutate: updatePlayerRole, isLoading: updateLoading } =
    useUpdatePlayerRole(data?.id || '')

  const positionTypes = usePlayerPositionTypesList()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />

  const isLoading = updateLoading || positionTypes.isLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-roles:EDIT_PAGE_TITLE')} />
      <EditPlayerRoleForm
        current={data}
        onSubmit={updatePlayerRole}
        positionTypesData={positionTypes.data || []}
      />
    </>
  )
}

export default EditPlayerRolePage
