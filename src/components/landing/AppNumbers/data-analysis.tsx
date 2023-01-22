import { styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import CountUp from 'react-countup'

export const DataAnalysisAppNumbers = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation()
  // TO_ADD DATA HOOK

  return (
    <Container>
      <Typography textTransform="uppercase" fontSize={16}>
        ponad{' '}
        <span style={{ color: 'red' }}>
          <CountUp end={10_000} separator="." />
        </span>{' '}
        prześwietlonych zawodników
      </Typography>
      <Divider />
      <Typography textTransform="uppercase" fontSize={16}>
        <span style={{ color: 'red' }}>
          <CountUp end={120} />
        </span>{' '}
        przeanalizowanych lig
      </Typography>
      <Divider />
      <Typography textTransform="uppercase" fontSize={16}>
        udział przy{' '}
        <span style={{ color: 'red' }}>
          <CountUp end={30} />
        </span>{' '}
        transferach
      </Typography>
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
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',

  gridTemplateColumns: '4fr 2px 3fr 2px 4fr',

  textAlign: 'center',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(1.5),
  },

  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
  },
}))
