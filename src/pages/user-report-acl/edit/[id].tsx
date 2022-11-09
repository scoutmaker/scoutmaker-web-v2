import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditUserReportAclForm } from '@/modules/user-report-acl/forms/edit'
import { useUpdateUserReportAcl } from '@/modules/user-report-acl/hooks'
import { UserReportAclDto } from '@/modules/user-report-acl/types'
import { getUserReportAclById } from '@/services/api/methods/user-report-acl'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<UserReportAclDto>(
  ['common', 'user-report-acl', 'permissions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getUserReportAclById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditUserReportAclPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<UserReportAclDto>) => {
  const { t } = useTranslation()

  const { mutate: updateUserReportAcl, isLoading: updateLoading } =
    useUpdateUserReportAcl(data?.id || '0')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('user-report-acl:EDIT_PAGE_TITLE')} />
      <EditUserReportAclForm current={data} onSubmit={updateUserReportAcl} />
    </>
  )
}

export default EditUserReportAclPage
