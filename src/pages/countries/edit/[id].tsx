import { useTranslation } from 'next-i18next'
import React from 'react'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { EditCountryForm } from '@/modules/countries/forms/edit'
import { useUpdateCountry } from '@/modules/countries/hooks'
import { CountryDto } from '@/modules/countries/types'
import { getCountryById } from '@/services/api/methods/countries'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CountryDto>(
  ['common', 'countries'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const country = await getCountryById(params?.id as string, token)
      return { data: country }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const EditCountryPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CountryDto>) => {
  const { t } = useTranslation()
  const { mutate: updateCountry, isLoading } = useUpdateCountry(data?.id || '')

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('countries:EDIT_PAGE_TITLE')} />
      <EditCountryForm current={data} onSubmit={updateCountry} />
    </>
  )
}

export default EditCountryPage
