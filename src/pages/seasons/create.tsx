import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateSeasonForm } from '@/modules/seasons/forms/create'
import { useCreateSeason } from '@/modules/seasons/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'seasons'], ['ADMIN'])

const CreateSeasonPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createSeason, isLoading: createLoading } = useCreateSeason()

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {createLoading && <Loader />}
      <PageHeading title={t('seasons:CREATE_PAGE_TITLE')} />
      <CreateSeasonForm
        onSubmit={createSeason}
      />
    </>
  )
}

export default CreateSeasonPage
