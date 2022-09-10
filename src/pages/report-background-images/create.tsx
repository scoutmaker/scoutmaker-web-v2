import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateReportBgImageForm } from '@/modules/report-background-images/forms/create'
import { useCreateReportBgImage } from '@/modules/report-background-images/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'report-bg-images'], ['ADMIN'])

const CreateReportBgImagePage = ({errorMessage,errorStatus}: TSsrRole) => {
  const { t } = useTranslation()

  const { mutate: createRepBgImg, isLoading: createLoading } = useCreateReportBgImage()

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {createLoading && <Loader />}
      <PageHeading title={t('report-bg-images:CREATE_PAGE_TITLE')} />
      <CreateReportBgImageForm
        onSubmit={createRepBgImg}
      />
    </>
  )
}

export default CreateReportBgImagePage
