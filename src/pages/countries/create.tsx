import { useTranslation } from 'next-i18next'
import React from 'react'

import { ErrorContent } from '@/components/error/error-content';
import { Loader } from '@/components/loader/loader';
import { PageHeading } from '@/components/page-heading/page-heading';
import { CreateCountryForm } from '@/modules/countries/forms/create';
import { useCreateCountry } from '@/modules/countries/hooks';
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole';

export const getServerSideProps = withSessionSsrRole(['common', 'countries'], ['ADMIN']);

const CreateCountriesPage = ({ errorMessage, errorStatus }: TSsrRole) => {
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