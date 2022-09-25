import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionAgeCategoriesList } from '@/modules/competition-age-categories/hooks'
import { useCompetitionJuniorLevelsList } from '@/modules/competition-junior-levels/hooks'
import { useCompetitionTypesList } from '@/modules/competition-types/hooks'
import { CreateCompetitionForm } from '@/modules/competitions/forms/create'
import { useCreateCompetition } from '@/modules/competitions/hooks'
import { useCountriesList } from '@/modules/countries/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'competitions'],
  ['ADMIN'],
)

const CreateCompetitionPage = ({ errorMessage, errorStatus }: TSsrRole) => {
  const { t } = useTranslation()

  const { data: ageCategoriesData, isLoading: ageCategLoading } =
    useCompetitionAgeCategoriesList()

  const { data: juniorLevelsData, isLoading: juniorLevelsLoading } =
    useCompetitionJuniorLevelsList()

  const { data: competitionTypesData, isLoading: compTypesLoading } =
    useCompetitionTypesList()

  const { data: countriesData, isLoading: countriesLoading } =
    useCountriesList()

  const { mutate: createCompetition, isLoading: createLoading } =
    useCreateCompetition()

  const isLoading =
    ageCategLoading ||
    juniorLevelsLoading ||
    compTypesLoading ||
    createLoading ||
    countriesLoading

  if (errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('competitions:CREATE_PAGE_TITLE')} />
      <CreateCompetitionForm
        onSubmit={createCompetition}
        competitionAgeCategoriesData={ageCategoriesData || []}
        competitionJuniorLevelsData={juniorLevelsData || []}
        competitionTypesData={competitionTypesData || []}
        countriesData={countriesData || []}
      />
    </>
  )
}

export default CreateCompetitionPage
