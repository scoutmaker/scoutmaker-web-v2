import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ClubDetailsCard } from '@/components/details-cards/club'
import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/lib/session'
import { ClubDto } from '@/modules/clubs/types'
import { getClubBySlug } from '@/services/api/methods/clubs'
import { ApiError } from '@/types/common'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TClubPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  club: ClubDto | null
}

export const getServerSideProps = withSessionSsr<TClubPageProps>(
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

const ClubPage = ({ club, errorMessage, errorStatus }: TClubPageProps) => {
  if (club) {
    return (
      <>
        <PageHeading title={club.name} />
        <ClubDetailsCard club={club} />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default ClubPage
