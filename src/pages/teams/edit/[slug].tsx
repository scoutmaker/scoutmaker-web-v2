import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useClubsList } from '@/modules/clubs/hooks'
import { EditTeamForm } from '@/modules/teams/forms/edit'
import { useUpdateTeam } from '@/modules/teams/hooks'
import { TeamDto } from '@/modules/teams/types'
import { getTeamBySlug } from '@/services/api/methods/teams'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<TeamDto>(['common', 'teams'], false,
  async (token, params) => {
    try {
      const data = await getTeamBySlug(
        params?.slug as string,
        token,
      )
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const EditTeamPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<TeamDto>) => {
  const { t } = useTranslation()

  const { data: clubs, isLoading: clubsLoading } = useClubsList()
  const { mutate: updateTeam, isLoading: updateTeamLoading } = useUpdateTeam(
    data?.id || '',
  )

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {(clubsLoading || updateTeamLoading) && <Loader />}
      <PageHeading
        title={t('teams:EDIT_TEAM_PAGE_TITLE', { name: data.name })}
      />
      <EditTeamForm
        current={data}
        clubsData={clubs || []}
        onSubmit={updateTeam}
      />
    </>
  )
}

export default EditTeamPage
