import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { CopyParticipationsForm } from '@/modules/competition-participations/forms/copy'
import { useCopyCompetitionParticipation } from '@/modules/competition-participations/hooks'
import { useSeasonsList } from '@/modules/seasons/hooks'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(['common', 'comp-participations'], ['ADMIN']);

const EditSeasonPage = ({
  errorMessage,
  errorStatus,
}: TSsrRole) => {
  const router = useRouter()
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
        fromSeasonId={+(router.query?.fromId as string) || 0}
      />
    </>
  )
}

export default EditSeasonPage
