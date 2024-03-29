import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { RegionDetailsCard } from '@/modules/regions/details-card'
import { RegionDto } from '@/modules/regions/types'
import { getRegionById } from '@/services/api/methods/regions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<RegionDto>(
  ['common', 'regions'],
  false,
  async (token, params) => {
    try {
      const regionData = await getRegionById(params?.id as string, token)
      return { data: regionData }
    } catch (error) {
      return {
        data: null,
        error: error as ApiError,
      }
    }
  },
)

const RegionPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<RegionDto>) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('REGION')} />
      <RegionDetailsCard region={data} />
    </>
  )
}

export default RegionPage
