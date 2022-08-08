import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'

import { ErrorContent } from '@/components/error/error-content';
import { Loader } from '@/components/loader/loader';
import { PageHeading } from '@/components/page-heading/page-heading';
import { withSessionSsr } from '@/modules/auth/session';
import { CreateCountryForm } from '@/modules/countries/forms/create';
import { useCreateCountry } from '@/modules/countries/hooks';
import { redirectToLogin } from '@/utils/redirect-to-login';

type ICountryPageProps = {
  errorStatus: number | null
  errorMessage: string | null
}

// TO_CHANGE
export const getServerSideProps = withSessionSsr<ICountryPageProps>(
  async ({ locale, req, res }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
        }
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
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
      },
    }
  },
)

const CreateCountriesPage = ({ errorMessage, errorStatus }: ICountryPageProps) => {
  const { t } = useTranslation();
  const { mutate: createCountry, isLoading } = useCreateCountry();

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t("countries:CREATE_PAGE_TITLE")} />
      <CreateCountryForm
        onSubmit={createCountry}
      />
    </>
  )
}

export default CreateCountriesPage