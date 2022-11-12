import { Grid, Rating, styled, Typography } from '@mui/material'

import { BallIcon } from '@/components/icons'

import { ReportDto } from '../types'

interface IProps {
  skills: ReportDto['skills']
  maxRatingScore: number
  printeable?: boolean
}

const fontSize = 10
export const ReportSkills = ({
  skills,
  printeable,
  maxRatingScore,
}: IProps) => (
  <Grid container spacing={2}>
    {skills.map(skill => (
      <Grid item xs={printeable ? 6 : 12} key={skill.template.name}>
        <Container>
          <Typography fontSize={printeable ? fontSize : undefined}>
            <strong>{skill.template.name}</strong>
          </Typography>
          {!!skill?.rating && (
            <StyledRating
              name={`${skill.template.name}.rating`}
              value={skill.rating}
              max={maxRatingScore}
              icon={<BallIcon fontSize="inherit" />}
              emptyIcon={<BallIcon fontSize="inherit" />}
              readOnly
              size={printeable ? 'small' : 'medium'}
            />
          )}
          {!!skill?.rating && printeable && (
            <Typography
              fontSize={fontSize}
              marginLeft={theme => theme.spacing(0.4)}
            >
              <strong>
                {skill.rating}/{maxRatingScore}
              </strong>
            </Typography>
          )}
        </Container>
        <Typography
          variant="body2"
          color="textSecondary"
          fontSize={printeable ? fontSize : undefined}
        >
          {skill.description}
        </Typography>
      </Grid>
    ))}
  </Grid>
)

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.secondary.light,
  },
  '& .MuiRating-iconHover': {
    color: theme.palette.secondary.main,
  },
}))

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: `${theme.spacing(1)}px`,
}))
