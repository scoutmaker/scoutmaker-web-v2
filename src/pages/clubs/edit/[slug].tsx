import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditClubForm } from '@/modules/clubs/forms/edit'
import { useUpdateClub } from '@/modules/clubs/hooks'
import { ClubDto } from '@/modules/clubs/types'
import { useCountriesList } from '@/modules/countries/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { getClubBySlug } from '@/services/api/methods/clubs'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<ClubDto>(['common', 'clubs'], false,
  async (token, params) => {
    try {
      const data = await getClubBySlug(
        params?.slug as string,
        token
      )
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const EditClubPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<ClubDto>) => {
  const { t } = useTranslation()

  const { data: regions, isLoading: isRegionsLoading } = useRegionsList()
  const { data: countries, isLoading: isCountriesLoading } = useCountriesList()
  const { mutate: updateClub, isLoading: isUpdateClubLoading } = useUpdateClub(
    data?.id || '',
  )

  if (data) {
    return (
      <>
        {(isRegionsLoading || isCountriesLoading || isUpdateClubLoading) && (
          <Loader />
        )}
        <PageHeading
          title={t('clubs:EDIT_CLUB_PAGE_TITLE', { name: data.name })}
        />
        <EditClubForm
          current={data}
          countriesData={countries || []}
          regionsData={regions || []}
          onSubmit={updateClub}
        />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default EditClubPage
