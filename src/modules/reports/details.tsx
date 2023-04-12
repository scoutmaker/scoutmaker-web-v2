import { Box } from '@mui/material'

import { StatsCard } from './components/stats-card'
import { SummaryCard } from './components/summary-card'
import { BasicDetailsCard } from './forms/components/basic-details-card'
import { SkillAssessmentsCard } from './forms/components/skill-assessments-card'
import { ReportDto } from './types'

interface IReportDetailsProps {
  report: ReportDto
}

export const ReportDetails = ({ report }: IReportDetailsProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <BasicDetailsCard report={report} />
    <SummaryCard report={report} />
    <SkillAssessmentsCard
      maxRatingScore={report.maxRatingScore}
      skills={report.skills}
      skillsOrder={report?.skillsOrder}
      readOnly
    />
    <StatsCard report={report} />
  </Box>
)
