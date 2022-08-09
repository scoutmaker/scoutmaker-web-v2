import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CountryDetailsCard } from '@/modules/countries/details-card'
import { CountryDto } from '@/modules/countries/types'
import { getCountryById } from '@/services/api/methods/countries'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CountryDto>(['common', 'countries'], ['ADMIN'],
  async (token, params) => {
    try {
      const country = await getCountryById(
        +(params?.id as string),
        token,
      )
      return { data: country }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  });

const CountryPage = ({ data, errorMessage, errorStatus }: TSsrRole<CountryDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('COUNTRY')} />
      <CountryDetailsCard country={data} />
    </>
  )
}
export default CountryPage
