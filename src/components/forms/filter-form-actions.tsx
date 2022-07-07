import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

export const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}))

interface IFilterFormActionsProps {
  handleClearFilter: () => void
}

export const FilterFormActions = ({
  handleClearFilter,
}: IFilterFormActionsProps) => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <Button type="submit" variant="contained" color="secondary" fullWidth>
        {t('APPLY_FILTERS')}
      </Button>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleClearFilter}
      >
        {t('CLEAR_FILTERS')}
      </Button>
    </StyledContainer>
  )
}
