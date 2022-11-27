import { Box, TextField, Typography } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import groupBy from 'just-group-by'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { Loader } from '@/components/loader/loader'
import { RatingInput } from '@/components/rating-input/rating-input'
import { useReportTemplate } from '@/modules/report-templates/hooks'

import { CreateReportDto } from '../../types'

function groupSkillsByCategory(
  skills: Components.Schemas.ReportSkillAssessmentTemplateDto[],
) {
  return groupBy(
    skills.map((skill, idx) => ({ ...skill, originalIdx: idx })),
    item => `${item.category.name}::${item.category.id}`,
  )
}

export const SkillAssessmentsStep = () => {
  const { t } = useTranslation()
  const { values, setFieldValue } = useFormikContext<CreateReportDto>()

  const { data: template, isLoading } = useReportTemplate(
    values?.templateId || '',
  )

  const groupedSkills = groupSkillsByCategory(
    template?.skillAssessmentTemplates || [],
  )

  useEffect(() => {
    template?.skillAssessmentTemplates.forEach((item, idx) =>
      setFieldValue(`skillAssessments[${idx}].templateId`, item.id),
    )
  }, [template])

  return (
    <>
      {isLoading && <Loader />}
      {template &&
        Object.entries(groupedSkills).map(([key, value]) => (
          <Box key={key} sx={{ marginBottom: 4 }}>
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
                {item.hasScore && (
                  <RatingInput
                    max={template.maxRatingScore}
                    name={`skillAssessments[${item.originalIdx}].rating`}
                    label={item.name}
                  />
                )}
                <Field
                  name={`skillAssessments[${item.originalIdx}].description`}
                  as={TextField}
                  variant="outlined"
                  fullWidth
                  multiline
                  label={t(item.name)}
                />
              </Box>
            ))}
          </Box>
        ))}
    </>
  )
}
