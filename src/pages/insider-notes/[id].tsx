import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { InsiderNoteDetailsCard } from '@/modules/insider-notes/details-card'
import { InsiderNoteDto } from '@/modules/insider-notes/types'
import { getInsiderNoteById } from '@/services/api/methods/insider-notes'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<InsiderNoteDto>(['common', 'insider-notes'], false,
  async (token, params) => {
    try {
      const data = await getInsiderNoteById(+(params.id as string), token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const InsiderNotePage = ({ data, errorMessage, errorStatus }: TSsrRole<InsiderNoteDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('insider-notes:NOTE_DETAILS')} />
      <InsiderNoteDetailsCard note={data} />
    </>
  )
}

export default InsiderNotePage
