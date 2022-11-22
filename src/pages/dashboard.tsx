import { styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { useDashboardData } from '@/modules/dashboard/hooks'
import PMScoutManagerDashboardLayout from '@/modules/dashboard/layouts/playmaker-manager'
import PMScoutDashboardLayout from '@/modules/dashboard/layouts/playmaker-scout'
import ScoutDashboardLayout from '@/modules/dashboard/layouts/scout'
import ScoutOrganizationDashboardLayout from '@/modules/dashboard/layouts/scout-organization'
import { DashboardDto } from '@/modules/dashboard/types'
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

  const {
    user: { organizationId: userOrganization, role: userRole },
  } = dashboardData || { user: {} }

  const isLoading =
    dashboardLoading || matchAttendanceLoading || leaveMatchAttendanceLoading

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title={t('dashboard:INDEX_PAGE_TITLE')} />
      <Container>
        {(userRole === 'ADMIN' || userRole === 'PLAYMAKER_SCOUT_MANAGER') && (
          <PMScoutManagerDashboardLayout
            data={dashboardData as DashboardDto}
            leaveMatchClick={leaveMatchAttendance}
            matchAttendance={matchAttendance}
          />
        )}
        {userRole === 'PLAYMAKER_SCOUT' && (
          <PMScoutDashboardLayout
            data={dashboardData as DashboardDto}
            leaveMatchClick={leaveMatchAttendance}
            matchAttendance={matchAttendance}
          />
        )}
        {userRole === 'SCOUT' &&
          (userOrganization ? (
            <ScoutOrganizationDashboardLayout
              data={dashboardData as DashboardDto}
            />
          ) : (
            <ScoutDashboardLayout
              data={dashboardData as DashboardDto}
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
