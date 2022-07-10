import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useTranslation } from 'next-i18next'

export const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}))

interface IMainFormActionsProps {
  label: string
  altActionLabel?: string
  isEditState?: boolean
  onCancelClick: () => void
}

export const MainFormActions = ({
  label,
  altActionLabel,
  isEditState,
  onCancelClick,
}: IMainFormActionsProps) => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <Button type="submit" fullWidth variant="contained" color="primary">
        {isEditState
          ? t('SAVE_CHANGES')
          : `${altActionLabel || t('ADD')} ${label}`}
      </Button>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={onCancelClick}
      >
        {t('CANCEL')}
      </Button>
    </StyledContainer>
  )
}
