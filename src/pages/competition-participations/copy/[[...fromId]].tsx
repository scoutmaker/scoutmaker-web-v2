import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CopyParticipationsForm } from '@/modules/competition-participations/forms/copy'
import { useCopyCompetitionParticipation } from '@/modules/competition-participations/hooks'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<number>(['common', 'comp-participations'], ['ADMIN'],
  async (token, params) => ({ data: params?.fromId ? +(params.fromId[0] as string) : 0 }));

const EditSeasonPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<number>) => {
  const { t } = useTranslation()

  const { data: seasonsData, isLoading: seasonsLoading } = useSeasonsList()

  const { mutate: copyComp, isLoading: copyLoading } = useCopyCompetitionParticipation()

  const isLoading = seasonsLoading || copyLoading
  if (errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={t('comp-participations:COPY_PAGE_TITLE')}
      />
      <CopyParticipationsForm
        onSubmit={copyComp}
        seasonsData={seasonsData || []}
        fromSeasonId={data as number}
      />
    </>
  )
}

export default EditSeasonPage
