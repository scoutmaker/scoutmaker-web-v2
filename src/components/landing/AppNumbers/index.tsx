import {
  Create as NotesIcon,
  LibraryBooks as ReportsIcon,
  Search as ScoutsIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material';

import { AppNumber } from './AppNumber';

/* eslint-disable arrow-body-style */
export const AppNumbers = () => {
  // TO_ADD DATA HOOK

  return (
    <Container>
      <AppNumber
        count={500}
        title="Raportów"
        icon={<ReportsIcon />}
      />
      <Divider />
      <AppNumber
        count={100}
        title="Notatek"
        icon={<NotesIcon />}
      />
      <Divider />
      <AppNumber
        count={20}
        title="Skautów"
        icon={<ScoutsIcon />}
      />
    </Container>
  );
};

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
