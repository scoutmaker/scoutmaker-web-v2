import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material'
import { Field } from 'formik'
import { useTranslation } from 'next-i18next'

import { RatingInput } from '@/components/rating-input/rating-input'
import { ReadOnlyRating } from '@/components/read-only-rating/read-only-rating'

import { ReportDto } from '../../types'
import { sortAndGroupSkills } from '../../utils'

interface ISkillAssessmentsCardProps {
  skills: ReportDto['skills']
  skillsOrder?: string[]
  maxRatingScore: number
  readOnly?: boolean
}

export const SkillAssessmentsCard = ({
  skills,
  maxRatingScore,
  readOnly,
  skillsOrder,
}: ISkillAssessmentsCardProps) => {
  const { t } = useTranslation(['common', 'reports'])

  const groupedSkills = sortAndGroupSkills(skills, skillsOrder)

  return (
    <Card>
      <CardHeader title={t('reports:EDIT_SKILL_ASSESSMENTS_CARD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {groupedSkills.map(group => (
          <Box key={group.id}>
            <Typography
              variant="h6"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
                marginBottom: 2,
              }}
            >
              {group.name}
            </Typography>
            {group.skills.map(item => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  marginBottom: 2,
                }}
                key={item.id}
              >
                {item.template.hasScore &&
                  (readOnly ? (
                    <ReadOnlyRating
                      max={maxRatingScore}
                      label={item.template.name}
                      value={item.rating || 0}
                    />
                  ) : (
                    <RatingInput
                      max={maxRatingScore}
                      label={item.template.name}
                      name={`skillAssessments-${item.id}-rating`}
                    />
                  ))}
                {readOnly ? (
                  <Typography>{item.description}</Typography>
                ) : (
                  <Field
                    name={`skillAssessments-${item.id}-description`}
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    multiline
                    label={t(item.template.name)}
                  />
                )}
              </Box>
            ))}
          </Box>
        ))}
      </CardContent>
    </Card>
  )
}
