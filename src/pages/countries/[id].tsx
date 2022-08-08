import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { CountryDetailsCard } from '@/modules/countries/details-card'
import { CountryDto } from '@/modules/countries/types'
import { getCountryById } from '@/services/api/methods/countries'
import { ApiError } from '@/services/api/types'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TCountryPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  country: CountryDto | null
}

// TO_CHANGE
export const getServerSideProps = withSessionSsr<TCountryPageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          country: null,
        },
      }
    }
    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'countries',
    ])

    if (user.role !== 'ADMIN') {
      return {
        props: {
          ...translations,
          errorStatus: 401,
          errorMessage: "Insufficient Permissions",
          country: null,
        },
      }
    }

    let country: CountryDto

    try {
      const countryData = await getCountryById(
        +(params?.id as string),
        req.session.token,
      )
      country = countryData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          country: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        country,
      },
    }
  },
)

const CountryPage = ({ country, errorMessage, errorStatus }: TCountryPageProps) => {
  const { t } = useTranslation()
  if (!country) return <ErrorContent message={errorMessage} status={errorStatus} />


  return (
    <>
      <PageHeading title={t('COUNTRY')} />
      <CountryDetailsCard country={country} />
    </>
  )
}
export default CountryPage
