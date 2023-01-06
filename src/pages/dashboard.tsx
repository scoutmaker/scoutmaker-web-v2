import { styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useUser } from '@/modules/auth/hooks'
import { useDashboardData } from '@/modules/dashboard/hooks'
import PMScoutManagerDashboardLayout from '@/modules/dashboard/layouts/playmaker-manager'
import PlaymakerScoutDashboardLayout from '@/modules/dashboard/layouts/playmaker-scout'
import ScoutDashboardLayout from '@/modules/dashboard/layouts/scout'
import ScoutOrganizationDashboardLayout from '@/modules/dashboard/layouts/scout-organization'
import {
  useActiveMatchAttendance,
  useRemoveMatchAttendance,
} from '@/modules/match-attendances/hooks'
import { withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole(
  ['common', 'dashboard'],
  false,
)

const DashboardPage = () => {
  const { t } = useTranslation()

  const { data: dashboardData, isLoading: dashboardLoading } =
    useDashboardData()

  const { data: matchAttendance, isLoading: matchAttendanceLoading } =
    useActiveMatchAttendance()
  const {
    mutate: leaveMatchAttendance,
    isLoading: leaveMatchAttendanceLoading,
  } = useRemoveMatchAttendance()

  const { data: user, isLoading: userLoading } = useUser()

  const isLoading =
    dashboardLoading ||
    matchAttendanceLoading ||
    leaveMatchAttendanceLoading ||
    userLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('dashboard:INDEX_PAGE_TITLE')} />
      <Container>
        {user?.role === 'PLAYMAKER_SCOUT_MANAGER' && (
          <PMScoutManagerDashboardLayout
            data={dashboardData || {}}
            leaveMatchClick={leaveMatchAttendance}
            matchAttendance={matchAttendance}
          />
        )}
        {(user?.role === 'ADMIN' || user?.role === 'PLAYMAKER_SCOUT') && (
          <PlaymakerScoutDashboardLayout
            data={dashboardData || {}}
            leaveMatchClick={leaveMatchAttendance}
            matchAttendance={matchAttendance}
          />
        )}
        {user?.role === 'SCOUT' &&
          (user?.organizationId ? (
            <ScoutOrganizationDashboardLayout data={dashboardData || {}} />
          ) : (
            <ScoutDashboardLayout
              data={dashboardData || {}}
              leaveMatchClick={leaveMatchAttendance}
              matchAttendance={matchAttendance}
            />
          ))}
      </Container>
    </>
  )
}

export default DashboardPage

const Container = styled('div')(({ theme }) => ({
  display: 'grid',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}))
