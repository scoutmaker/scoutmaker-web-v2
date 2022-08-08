import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCountriesList } from '@/modules/countries/hooks'
import { CreateRegionForm } from '@/modules/regions/forms/create'
import { useCreateRegion } from '@/modules/regions/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'regions'], ['ADMIN'])

const CreateTeamPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { data: countries, isLoading: countriesLoading } = useCountriesList()

  const { mutate: createRegion, isLoading: createRegionLoading } = useCreateRegion()

  const isLoading =
    createRegionLoading ||
    countriesLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('regions:CREATE_PAGE_TITLE')} />
      <CreateRegionForm
        countriesData={countries || []}
        onSubmit={createRegion}
      />
    </>
  )
}

export default CreateTeamPage
