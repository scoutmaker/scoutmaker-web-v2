import { styled, Typography } from '@mui/material'

import { ReportDto } from '../types'
import { ReportSkills } from './reportSkills'

interface Props {
  category: string
  skills: ReportDto['skills']
  maxRatingScore: number
}

export const SkillsPrintSection = ({
  category,
  skills,
  maxRatingScore,
}: Props) => (
  <section>
    <Heading variant="h6" align="center">
      {category}
    </Heading>
    <ReportSkills skills={skills} printeable maxRatingScore={maxRatingScore} />
  </section>
)

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 700,
  marginBottom: theme.spacing(1),
}))
