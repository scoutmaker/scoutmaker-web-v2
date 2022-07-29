import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CreateClubForm } from '@/components/forms/club/create-club'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { useCreateClub } from '@/modules/clubs/hooks'
import { useCountriesList } from '@/modules/countries/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { redirectToLogin } from '@/utils/redirect-to-login'

export const getServerSideProps = withSessionSsr(
  async ({ req, res, locale }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return { props: {} }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'clubs',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

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
