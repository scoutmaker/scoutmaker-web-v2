import {
  Create as NotesIcon,
  LibraryBooks as ReportsIcon,
  Search as ScoutsIcon,
} from '@mui/icons-material'
import { styled } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AppNumber } from './AppNumber'

export const AppNumbers = () => {
  const { t } = useTranslation()
  // TO_ADD DATA HOOK

  return (
    <Container>
      <AppNumber
        count={500}
        title={t('landing:NUMBERS_REPORTS')}
        icon={<ReportsIcon />}
      />
      <Divider />
      <AppNumber
        count={100}
        title={t('landing:NUMBERS_NOTES')}
        icon={<NotesIcon />}
      />
      <Divider />
      <AppNumber
        count={20}
        title={t('landing:NUMBERS_SCOUTS')}
        icon={<ScoutsIcon />}
      />
    </Container>
  )
}

const Divider = styled('div')(({ theme }) => ({
  width: 2,
  height: 50,
  background: theme.palette.primary.contrastText,

  [theme.breakpoints.down('sm')]: {
    height: 2,
    width: '50%',
  },
}))

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))
