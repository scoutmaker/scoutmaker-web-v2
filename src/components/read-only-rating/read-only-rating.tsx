import { Rating, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

import { BallIcon } from '@/components/icons'

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}))

interface IReadOnlyRatingProps {
  max: number
  label?: string
  value: number
}

export const ReadOnlyRating = ({ max, label, value }: IReadOnlyRatingProps) => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <Typography sx={{ fontWeight: 'bold' }}>
        {label || t('RATING')}
      </Typography>
      <Rating
        precision={1}
        max={max}
        sx={{
          '& .MuiRating-iconFilled': {
            color: 'secondary.light',
          },
        }}
        icon={<BallIcon />}
        emptyIcon={<BallIcon />}
        readOnly
        value={value}
      />
    </StyledContainer>
  )
}
