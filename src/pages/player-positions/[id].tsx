import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { PlayerPositionDetailsCard } from '@/modules/player-positions/details-card'
import { PlayerPositionDto } from '@/modules/player-positions/types'
import { getPlayerPositionById } from '@/services/api/methods/player-positions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<PlayerPositionDto>(['common', 'player-positions'], ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getPlayerPositionById(
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

const PlayerPositionPage = ({ data, errorMessage, errorStatus }: TSsrRole<PlayerPositionDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('POSITION')} />
      <PlayerPositionDetailsCard position={data} />
    </>
  )
}

export default PlayerPositionPage
