import { SportsSoccer as BallIcon } from '@mui/icons-material'
import { Rating, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

interface IRatingInputProps {
  max: number
  value: any
}

export const RatingInput = ({ max, value }: IRatingInputProps) => {
  const { t } = useTranslation()
  const [ratingField] = useField({ name: 'rating', type: 'number' })

  return (
    <StyledContainer>
      <Typography>{t('RATING')}</Typography>
      <Rating
        {...ratingField}
        value={value}
        precision={1}
        name="rating"
        max={max}
        sx={{
          '& .MuiRating-iconFilled': {
            color: 'secondary.light',
          },
        }}
        icon={<BallIcon />}
        emptyIcon={<BallIcon />}
      />
    </StyledContainer>
  )
}

// const useStyles = makeStyles((theme: Theme) => ({
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: `${theme.spacing(1)}px`,
//   },
//   title: {
//     fontWeight: 'bold',
//   },
// }));
