import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useCompetitionAgeCategoriesList } from '@/modules/competition-age-categories/hooks'
import { useCompetitionJuniorLevelsList } from '@/modules/competition-junior-levels/hooks'
import { useCompetitionTypesList } from '@/modules/competition-types/hooks'
import { EditCompetitionForm } from '@/modules/competitions/forms/edit'
import { useUpdateCompetition } from '@/modules/competitions/hooks'
import { CompetitionDto } from '@/modules/competitions/types'
import { useCountriesList } from '@/modules/countries/hooks'
import { getCompetitionById } from '@/services/api/methods/competitions'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<CompetitionDto>(
  ['common', 'competitions'],
  ['ADMIN'],
  async (token, params) => {
    try {
      const data = await getCompetitionById(params?.id as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const EditCompetitionPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<CompetitionDto>) => {
  const { t } = useTranslation()

  const { data: ageCategoriesData, isLoading: ageCategLoading } =
    useCompetitionAgeCategoriesList()

  const { data: juniorLevelsData, isLoading: juniorLevelsLoading } =
    useCompetitionJuniorLevelsList()

  const { data: competitionTypesData, isLoading: compTypesLoading } =
    useCompetitionTypesList()

  const { data: countriesData, isLoading: countriesLoading } =
    useCountriesList()

  const { mutate: updateCompetition, isLoading: updateLoading } =
    useUpdateCompetition(data?.id || '')

  const isLoading =
    ageCategLoading ||
    juniorLevelsLoading ||
    compTypesLoading ||
    countriesLoading ||
    updateLoading

  if (errorStatus || !data)
    return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('competitions:EDIT_PAGE_TITLE')} />
      <EditCompetitionForm
        current={data}
        onSubmit={updateCompetition}
        competitionAgeCategoriesData={ageCategoriesData || []}
        competitionJuniorLevelsData={juniorLevelsData || []}
        competitionTypesData={competitionTypesData || []}
        countriesData={countriesData || []}
      />
    </>
  )
}

export default EditCompetitionPage
