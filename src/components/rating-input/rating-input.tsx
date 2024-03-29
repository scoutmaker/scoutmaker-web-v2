import { Rating, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'

import { BallIcon } from '@/components/icons'

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

interface IRatingInputProps {
  max: number
  label?: string
  name: string
}

export const RatingInput = ({ max, label, name }: IRatingInputProps) => {
  const { t } = useTranslation()
  const [ratingField] = useField({ name })

  return (
    <StyledContainer>
      <Typography>{label || t('RATING')}</Typography>
      <Rating
        {...ratingField}
        precision={1}
        name={name}
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
