import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionAgeCategories } from '@/modules/competition-age-categories/hooks'
import { useCompetitionJuniorLevels } from '@/modules/competition-junior-levels/hooks'
import { useCompetitionTypes } from '@/modules/competition-types/hooks'
import { CreateCompetitionForm } from '@/modules/competitions/forms/create'
import { useCreateCompetition } from '@/modules/competitions/hooks'
import { useCountriesList } from '@/modules/countries/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'competitions'], ['ADMIN'])

const CreateCompetitionPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  // UPDATE IN FUTURE
  const { data: ageCategoriesData, isLoading: ageCategLoading } = useCompetitionAgeCategories({})

  // UPDATE IN FUTURE
  const { data: juniorLevelsData, isLoading: juniorLevelsLoading } = useCompetitionJuniorLevels({})

  // UPDATE IN FUTURE
  const { data: competitionTypesData, isLoading: compTypesLoading } = useCompetitionTypes({})

  const { data: countriesData, isLoading: countriesLoading } = useCountriesList()

  const { mutate: createCompetition, isLoading: createLoading } = useCreateCompetition()

  const isLoading =
    ageCategLoading ||
    juniorLevelsLoading ||
    compTypesLoading ||
    createLoading ||
    countriesLoading

  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('competitions:CREATE_PAGE_TITLE')} // ADD_TRANS
      />
      <CreateCompetitionForm
        onSubmit={createCompetition}
        // @ts-ignore UPDATE IN FUTURE 
        competitionAgeCategoriesData={ageCategoriesData || []}
        // @ts-ignore UPDATE IN FUTURE
        competitionJuniorLevelsData={juniorLevelsData || []}
        // @ts-ignore UPDATE IN FUTURE
        competitionTypesData={competitionTypesData || []}
        countriesData={countriesData || []}
      />
    </>
  )
}

export default CreateCompetitionPage
