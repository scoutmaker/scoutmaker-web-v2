import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCreateReport } from '@/modules/reports/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'reports'],
  false,
)

const CreateReportPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createReport, isLoading } = useCreateReport()

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('reports:CREATE_PAGE_TITLE')} />
      {/* <CreateReportForm
        onSubmit={createReport}
      /> */}
    </>
  )
}

export default CreateReportPage
