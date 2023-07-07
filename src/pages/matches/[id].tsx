import { AppBar, Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { Loader } from '@/components/loader/loader'
import { PageHeading } from '@/components/page-heading/page-heading'
import { TabPanel } from '@/components/tab-panel/tab-panel'
import { MatchDetailsCard } from '@/modules/matches/details-card'
import { useSingleMatchPageData } from '@/modules/matches/hooks/use-single-match-page-data'
import { MatchDto } from '@/modules/matches/types'
import { getMatchDisplayName } from '@/modules/matches/utils'
import { NotesTable } from '@/modules/notes/table/table'
import { ReportsTable } from '@/modules/reports/table/table'
import { getMatchById } from '@/services/api/methods/matches'
import { ApiError } from '@/services/api/types'
import { useTabs } from '@/utils/hooks/use-tabs'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<MatchDto>(
  ['common', 'matches'],
  false,
  async (token, params) => {
    try {
      const data = await getMatchById(params?.id as string, token)
      return { data }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const MatchPage = ({ data, errorMessage, errorStatus }: TSsrRole<MatchDto>) => {
  const { t } = useTranslation()
  const { activeTab, handleTabChange } = useTabs()

  const customTheme = useTheme()
  const isMobile = useMediaQuery(customTheme.breakpoints.down('sm'))

  const { tabs, likeNote, likeReport, unlikeNote, unlikeReport, isLoading } =
    useSingleMatchPageData({
      matchId: data?.id || '',
      homeTeamId: data?.homeTeam.id || '',
      awayTeamId: data?.awayTeam.id || '',
    })

  if (!data) return <ErrorContent message={errorMessage} status={errorStatus} />

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading
        title={getMatchDisplayName({
          homeTeamName: data.homeTeam.name,
          awayTeamName: data.awayTeam.name,
          date: data.date,
        })}
      />
      <MatchDetailsCard match={data} />

      <Box width="100%">
        <AppBar
          position="static"
          sx={{
            marginTop: 3,
            marginBottom: 1,
            borderRadius: 1,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="teams-notes-reports-tab"
            indicatorColor="secondary"
            textColor="inherit"
            variant={isMobile ? 'scrollable' : 'fullWidth'}
            scrollButtons="auto"
          >
            {tabs.map(({ name, docCount, titleI18nKey }) => (
              <Tab key={name} label={t(titleI18nKey, { count: docCount })} />
            ))}
          </Tabs>
        </AppBar>
        {tabs.map(
          (
            { name, type, data: docs, docCount, tableSettings, tableHandlers },
            idx,
          ) => (
            <TabPanel
              key={name}
              value={activeTab}
              index={idx}
              title={name}
              noPadding
            >
              {type === 'note' ? (
                <NotesTable
                  {...tableSettings}
                  {...tableHandlers}
                  data={docs}
                  total={docCount}
                  onLikeClick={likeNote}
                  onUnLikeClick={unlikeNote}
                />
              ) : (
                <ReportsTable
                  {...tableSettings}
                  {...tableHandlers}
                  data={docs}
                  total={docCount}
                  onLikeClick={likeReport}
                  onUnLikeClick={unlikeReport}
                />
              )}
            </TabPanel>
          ),
        )}
      </Box>
    </>
  )
}

export default MatchPage
