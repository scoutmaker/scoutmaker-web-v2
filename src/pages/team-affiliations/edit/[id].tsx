import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditTeamAffiliationForm } from '@/modules/team-affiliations/forms/edit'
import { useUpdateTeamAffiliation } from '@/modules/team-affiliations/hooks'
import { TeamAffiliationDto } from '@/modules/team-affiliations/types'
import { getTeamAffiliationById } from '@/services/api/methods/team-affiliations'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<TeamAffiliationDto>(['common', 'team-affiliations'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getTeamAffiliationById(
        +(params?.id as string),
        token,
      )
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError
      }
    }
  });

const EditTeamAffiliationPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<TeamAffiliationDto>) => {
  const { t } = useTranslation()

  const { mutate: updateTeamAffiliation, isLoading: updateLoading } = useUpdateTeamAffiliation(
    data?.id || 0,
  )

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {updateLoading && <Loader />}
      <PageHeading
        title={t('team-affiliations:EDIT_PAGE_TITLE')}
      />
      <EditTeamAffiliationForm
        current={data}
        onSubmit={updateTeamAffiliation}
      />
    </>
  )
}

export default EditTeamAffiliationPage
