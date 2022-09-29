import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CreateClubForm } from '@/modules/clubs/forms/create'
import { useCreateClub } from '@/modules/clubs/hooks'
import { useCountriesList } from '@/modules/countries/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'clubs'], false)

const CreateClubPage = () => {
  const { t } = useTranslation()

  const { data: regions, isLoading: isRegionsLoading } = useRegionsList()
  const { data: countries, isLoading: isCountriesLoading } = useCountriesList()
  const { mutate: createClub, isLoading: isCreateClubLoading } = useCreateClub()

  return (
    <>
      {(isRegionsLoading || isCountriesLoading || isCreateClubLoading) && (
        <Loader />
      )}
      <PageHeading title={t('clubs:CREATE_CLUB_PAGE_TITLE')} />
      <CreateClubForm
        countriesData={countries || []}
        regionsData={regions || []}
        onSubmit={createClub}
      />
    </>
  )
}

export default CreateClubPage
