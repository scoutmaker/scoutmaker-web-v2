import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { SeasonDetailsCard } from '@/modules/seasons/details-card'
import { SeasonDto } from '@/modules/seasons/types'
import { getSeasonById } from '@/services/api/methods/seasons'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<SeasonDto>(
  ['common', 'seasons'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getSeasonById(params?.id as string, token)
      return { data }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const SeasonPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<SeasonDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('SEASON')} />
      <SeasonDetailsCard season={data} />
    </>
  )
}

export default SeasonPage
