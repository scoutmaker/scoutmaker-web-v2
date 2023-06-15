import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { PlayerGradeDetailsCard } from '@/modules/player-grades/details-card'
import { PlayerGradeDto } from '@/modules/player-grades/types'
import { getPlayerGradeById } from '@/services/api/methods/player-grades'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<PlayerGradeDto>(
  ['common', 'player-grades'],
  false,
  async (token, params) => {
    try {
      const data = await getPlayerGradeById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const PlayerGradePage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<PlayerGradeDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('PLAYER_GRADE')} />
      <PlayerGradeDetailsCard data={data} />
    </>
  )
}

export default PlayerGradePage
