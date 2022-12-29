import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { GoToMatchForm } from '@/modules/match-attendances/forms/go-to-match'
import {
  useActiveMatchAttendance,
  useAddMatchAttendance,
  useRemoveMatchAttendance,
} from '@/modules/match-attendances/hooks'
import { useMatchesList } from '@/modules/matches/hooks'
import { useConfirmOnLeavePage } from '@/utils/hooks/use-confirm-leave'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'go-to-match'],
  false,
)

const GoToMatchPage = () => {
  const { t } = useTranslation()

  const { data: activeMatch, isLoading: activeMatchLoading } =
    useActiveMatchAttendance()
  const {
    mutate: removeMatchAttendance,
    isLoading: removeMatchAttendanceLoading,
  } = useRemoveMatchAttendance()
  const { mutate: addMatchAttendance, isLoading: addMatchAttendanceLoading } =
    useAddMatchAttendance()

  const { data: matches, isLoading: matchesLoading } = useMatchesList()

  useConfirmOnLeavePage()

  const isLoading =
    activeMatchLoading ||
    matchesLoading ||
    removeMatchAttendanceLoading ||
    addMatchAttendanceLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('go-to-match:INDEX_PAGE_TITLE')} />
      <GoToMatchForm
        activeMatch={activeMatch}
        matchesData={matches || []}
        onLeaveMatchClick={removeMatchAttendance}
        onSubmit={data => addMatchAttendance(data)}
      />
    </>
  )
}

export default GoToMatchPage
