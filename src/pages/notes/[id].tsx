import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { NoteDetailsCard } from '@/modules/notes/details-card'
import { NoteDto } from '@/modules/notes/types'
import { getNoteById } from '@/services/api/methods/notes'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<NoteDto>(['common', 'notes'], false,
  async (token, params) => {
    try {
      const data = await getNoteById(
        params?.id as string,
        token
      )
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  })

const NotePage = ({ data, errorMessage, errorStatus }: TSsrRole<NoteDto>) => {
  const { t } = useTranslation(['common', 'notes'])

  if (data) {
    return (
      <>
        <PageHeading title={t('notes:NOTE_DETAILS')} />
        <NoteDetailsCard note={data} />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default NotePage
