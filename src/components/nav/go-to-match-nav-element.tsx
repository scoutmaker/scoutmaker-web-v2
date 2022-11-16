import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { useRemoveMatchAttendance } from '@/modules/match-attendances/hooks'

import { GoToMatchIcon } from '../icons'
import { Loader } from '../loader/loader'
import { NavElement } from './nav-element'

interface IProps {
  currentMatchId: string | null
}
const GoToMachNavElement = ({ currentMatchId }: IProps) => {
  const { t } = useTranslation()
  const {
    mutate: removeMatchAttendance,
    isLoading: removeMatchAttendanceLoading,
  } = useRemoveMatchAttendance()

  return (
    <>
      {removeMatchAttendanceLoading && <Loader />}
      {currentMatchId ? (
        <ListItemButton
          sx={{
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
          onClick={() => removeMatchAttendance()}
        >
          <ListItemIcon>
            <GoToMatchIcon color="error" />
          </ListItemIcon>
          <ListItemText
            primary={t('LEAVE_MATCH')}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItemButton>
      ) : (
        <NavElement
          icon={<GoToMatchIcon color="error" />}
          to="/go-to-match"
          text={t('GO_TO_MATCH')}
        />
      )}
    </>
  )
}

export default GoToMachNavElement
