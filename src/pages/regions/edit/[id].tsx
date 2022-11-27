import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCountriesList } from '@/modules/countries/hooks'
import { EditRegionForm } from '@/modules/regions/forms/edit'
import { useUpdateRegion } from '@/modules/regions/hooks'
import { RegionDto } from '@/modules/regions/types'
import { getRegionById } from '@/services/api/methods/regions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<RegionDto>(
  ['common', 'regions'],
  ['ADMIN'],
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

const EditTeamPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<RegionDto>) => {
  const { t } = useTranslation()

  const { data: countries, isLoading: countriesLoading } = useCountriesList()
  const { mutate: updateRegion, isLoading: updateRegionLoading } =
    useUpdateRegion(data?.id || '')

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {(countriesLoading || updateRegionLoading) && <Loader />}
      <PageHeading title={t('regions:EDIT_PAGE_TITLE')} />
      <EditRegionForm
        current={data}
        countriesData={countries || []}
        onSubmit={updateRegion}
      />
    </>
  )
}

export default EditTeamPage
