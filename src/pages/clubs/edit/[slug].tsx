import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { EditClubForm } from '@/components/forms/club/edit-club'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/lib/session'
import { useUpdateClub } from '@/modules/clubs/hooks'
import { ClubDto } from '@/modules/clubs/types'
import { useCountriesList } from '@/modules/countries/hooks'
import { useRegionsList } from '@/modules/regions/hooks'
import { getClubBySlug } from '@/services/api/methods/clubs'
import { ApiError } from '@/types/common'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TEditClubPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  club: ClubDto | null
}

export const getServerSideProps = withSessionSsr<TEditClubPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          club: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'clubs',
    ])

    let club: ClubDto

    try {
      const clubData = await getClubBySlug(
        params?.slug as string,
        req.session.token,
      )
      club = clubData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          club: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        club,
      },
    }
  },
)

const EditClubPage = ({
  club,
  errorMessage,
  errorStatus,
}: TEditClubPageProps) => {
  const { t } = useTranslation()

  const { data: regions, isLoading: isRegionsLoading } = useRegionsList()
  const { data: countries, isLoading: isCountriesLoading } = useCountriesList()
  const { mutate: updateClub, isLoading: isUpdateClubLoading } = useUpdateClub(
    club?.id || 0,
  )

  if (club) {
    return (
      <>
        {(isRegionsLoading || isCountriesLoading || isUpdateClubLoading) && (
          <Loader />
        )}
        <PageHeading
          title={t('clubs:EDIT_CLUB_PAGE_TITLE', { name: club.name })}
        />
        <EditClubForm
          current={club}
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
