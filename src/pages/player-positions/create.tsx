import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreatePlayerPositionForm } from '@/modules/player-positions/forms/create'
import { useCreatePlayerPosition } from '@/modules/player-positions/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'player-positions'], ['ADMIN'])

const CreatePlayerPositionPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createPlayerPosition, isLoading: createLoading } = useCreatePlayerPosition()

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {createLoading && <Loader />}
      <PageHeading title={t('player-positions:CREATE_PAGE_TITLE')} // ADD_TRANS
      />
      <CreatePlayerPositionForm
        onSubmit={createPlayerPosition}
      />
    </>
  )
}

export default CreatePlayerPositionPage
