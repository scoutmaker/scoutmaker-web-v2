import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { CompetitionAgeCategoryDetailsCard } from '@/modules/competition-age-categories/details-card'
import { CompetitionAgeCategortyDto } from '@/modules/competition-age-categories/types'
import { getCompetitionAgeCategoryById } from '@/services/api/methods/competition-age-categories'
import { ApiError } from '@/services/api/types'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  data: CompetitionAgeCategortyDto | null
}
// TO_CHANGE
export const getServerSideProps = withSessionSsr<TPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          data: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
    ])

    let data: CompetitionAgeCategortyDto

    try {
      data = await getCompetitionAgeCategoryById(
        +(params?.id as string),
        req.session.token,
      )
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          data: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        data,
      },
    }
  },
)

const ClubPage = ({ data, errorMessage, errorStatus }: TPageProps) => {
  const { t } = useTranslation()

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('COMPETITION_AGE_CATEGORY')} />
      <CompetitionAgeCategoryDetailsCard data={data} />
    </>
  )



}

export default ClubPage
