import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { withSessionSsr } from '@/modules/auth/session'
import { NoteDetailsCard } from '@/modules/notes/details-card'
import { NoteDto } from '@/modules/notes/types'
import { getNoteById } from '@/services/api/methods/notes'
import { ApiError } from '@/services/api/types'
import { redirectToLogin } from '@/utils/redirect-to-login'

type TNotePageProps = {
  errorStatus: number | null
  errorMessage: string | null
  note: NoteDto | null
}

export const getServerSideProps = withSessionSsr<TNotePageProps>(
  async ({ req, res, locale, params }) => {
    const { user } = req.session

    if (!user) {
      redirectToLogin(res)
      return {
        props: {
          errorStatus: null,
          errorMessage: null,
          note: null,
        },
      }
    }

    const translations = await serverSideTranslations(locale || 'pl', [
      'common',
      'notes',
    ])

    let note: NoteDto

    try {
      const noteData = await getNoteById(
        params?.id as string,
        req.session.token,
      )
      note = noteData
    } catch (error) {
      const { response } = error as ApiError

      return {
        props: {
          ...translations,
          errorStatus: response.status,
          errorMessage: response.data.message,
          note: null,
        },
      }
    }

    return {
      props: {
        ...translations,
        errorStatus: null,
        errorMessage: null,
        note,
      },
    }
  },
)

const NotePage = ({ note, errorMessage, errorStatus }: TNotePageProps) => {
  const { t } = useTranslation(['common', 'notes'])

  if (note) {
    return (
      <>
        <PageHeading title={t('notes:NOTE_DETAILS')} />
        <NoteDetailsCard note={note} />
      </>
    )
  }

  return <ErrorContent message={errorMessage} status={errorStatus} />
}

export default NotePage
