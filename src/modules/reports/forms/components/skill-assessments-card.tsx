import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from '@mui/material'
import { Field } from 'formik'
import groupBy from 'just-group-by'
import { useTranslation } from 'next-i18next'

import { RatingInput } from '@/components/rating-input/rating-input'
import { ReadOnlyRating } from '@/components/read-only-rating/read-only-rating'

function groupSkillsByCategory(
  skills: Components.Schemas.ReportSkillAssessmentBasicDataDto[],
) {
  return groupBy(
    skills.map((skill, idx) => ({ ...skill, originalIdx: idx })),
    item => `${item.template.category.name}::${item.template.category.id}`,
  )
}

interface ISkillAssessmentsCardProps {
  skills: any
  maxRatingScore: number
  readOnly?: boolean
}

export const SkillAssessmentsCard = ({
  skills,
  maxRatingScore,
  readOnly,
}: ISkillAssessmentsCardProps) => {
  const { t } = useTranslation(['common', 'reports'])

  const groupedSkills = groupSkillsByCategory(skills)

  return (
    <Card>
      <CardHeader title={t('reports:EDIT_SKILL_ASSESSMENTS_CARD')} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Object.entries(groupedSkills).map(([key, value]) => (
          <Box key={key}>
            <Typography
              variant="h6"
              sx={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
                marginBottom: 2,
              }}
            >
              {key.split('::')[0]}
            </Typography>
            {value.map(item => (
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
                      name={`skillAssessments[${item.originalIdx}].rating`}
                    />
                  ))}
                {readOnly ? (
                  <Typography>{item.description}</Typography>
                ) : (
                  <Field
                    name={`skillAssessments[${item.originalIdx}].description`}
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