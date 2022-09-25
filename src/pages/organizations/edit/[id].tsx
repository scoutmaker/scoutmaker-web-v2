import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditOrganizationForm } from '@/modules/organizations/forms/edit'
import { useUpdateOrganization } from '@/modules/organizations/hooks'
import { OrganizationDto } from '@/modules/organizations/types'
import { getOrganizationById } from '@/services/api/methods/organizations'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrganizationDto>(
  ['common', 'organizations'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getOrganizationById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const EditOrganizationPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<OrganizationDto>) => {
  const { t } = useTranslation()

  const { mutate: updateOrganization, isLoading: updateLoading } =
    useUpdateOrganization(data?.id || '0')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading title={t('organizations:EDIT_PAGE_TITLE')} />
      <EditOrganizationForm current={data} onSubmit={updateOrganization} />
    </>
  )
}

export default EditOrganizationPage
