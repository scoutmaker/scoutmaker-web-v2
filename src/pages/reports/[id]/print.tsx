import { Box, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import { ErrorContent } from '@/components/error/error-content'
import { MatchDto } from '@/modules/matches/types'
import { PlayerDto } from '@/modules/players/types'
import { PrinteableReport } from '@/modules/reports/PrinteableReport'
import { ReportDto } from '@/modules/reports/types'
import { getMatchById } from '@/services/api/methods/matches'
import { getPlayerById } from '@/services/api/methods/players'
import { getReportById } from '@/services/api/methods/reports'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

interface IData {
  report: ReportDto
  player: PlayerDto
  match?: MatchDto
}

export const getServerSideProps = withSessionSsrRole<IData>(
  ['common', 'reports', 'report-print'],
  false,
  async (token, params) => {
    try {
      const report: ReportDto = await getReportById(params?.id as string, token)
      const player = await getPlayerById(report.player.id, token)
      const returnData: { data: IData } = { data: { report, player } }
      if (report?.match)
        returnData.data.match = await getMatchById(report.match.id, token)
      return returnData
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  },
)

const PrintReportPage = ({
  data,
  errorMessage,
  errorStatus,
}: TSsrRole<IData>) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement | null>(null)

  // TODO: SUPPORT BG
  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: 'Report',
    // bodyClass: (props: any) => ({
    //   backgroundImage: `url(${props.background})`,
    //   backgroundSize: 'contain',
    //   backgroundRepeat: 'no-repeat',
    // }),
  })

  if (!data || errorStatus)
    return <ErrorContent message={errorMessage} status={errorStatus} />

  return (
    <Box
      sx={{
        maxWidth: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      <Button
        onClick={handlePrint}
        variant="contained"
        sx={{ marginBottom: 2 }}
      >
        {t('reports:PRINT')}
      </Button>
      <Box sx={{ background: 'white' }}>
        <div ref={ref}>
          <PrinteableReport {...data} />
        </div>
      </Box>
    </Box>
  )
}

export default PrintReportPage
