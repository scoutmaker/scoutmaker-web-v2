import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { usePlayerPositionTypesList } from '@/modules/player-position-types/hooks'
import { CreatePlayerRoleForm } from '@/modules/player-roles/forms/create'
import { useCreatePlayerRole } from '@/modules/player-roles/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'player-roles'],
  ['ADMIN'],
)

const CreatePlayerRolePage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createPlayerRole, isLoading: createLoading } =
    useCreatePlayerRole()
  const positionTypes = usePlayerPositionTypesList()

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />

  const isLoading = createLoading || positionTypes.isLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('player-roles:CREATE_PAGE_TITLE')} />
      <CreatePlayerRoleForm
        onSubmit={createPlayerRole}
        positionTypesData={positionTypes.data || []}
      />
    </>
  )
}

export default CreatePlayerRolePage
