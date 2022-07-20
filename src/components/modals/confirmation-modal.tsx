import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

interface IModalProps extends DialogProps {
  message: string
  handleAccept: () => void
  handleClose: () => void
}

export const ConfirmationModal = ({
  message,
  open,
  handleAccept,
  handleClose,
}: IModalProps) => {
  const { t } = useTranslation()

  function onAccept() {
    handleAccept()
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onAccept} autoFocus>
          {t('YES')}
        </Button>
        <Button color="primary" onClick={handleClose}>
          {t('NO')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
