import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { EditCountryForm } from '@/modules/countries/forms/edit'
import { useUpdateCountry } from '@/modules/countries/hooks'
import { CountryDto } from '@/modules/countries/types'
import { getCountryById } from '@/services/api/methods/countries'
import { ApiError } from '@/services/api/types'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TEditCountryPageProps = {
  errorStatus: number | null
  errorMessage: string | null
  country: CountryDto | null
}

export const getServerSideProps = withSessionSsr<TEditCountryPageProps>(
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

const EditCountryPage = ({ country, errorMessage, errorStatus }: TEditCountryPageProps) => {
  const { t } = useTranslation();
  const { mutate: updateCountry, isLoading } = useUpdateCountry(country?.id || 0);

  if (!country) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('countries:EDIT_PAGE_TITLE')} />
      <EditCountryForm
        current={country}
        onSubmit={updateCountry}
      />
    </>
  )
}

export default EditCountryPage