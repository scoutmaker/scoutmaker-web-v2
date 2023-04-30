import { styled, Typography } from '@mui/material'

import { ReportDto } from '../types'
import { ReportSkills } from './reportSkills'

interface Props {
  category: string
  skills: ReportDto['skills']
  maxRatingScore: number
  compact: boolean
}

export const SkillsPrintSection = ({
  category,
  skills,
  maxRatingScore,
  compact,
}: Props) => (
  <section style={{ width: compact ? '33.33%' : '100%' }}>
    <Heading variant="h6" align="center">
      {category}
    </Heading>
    <ReportSkills
      skills={skills}
      printeable
      maxRatingScore={maxRatingScore}
      compact={compact}
    />
  </section>
)

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}))
