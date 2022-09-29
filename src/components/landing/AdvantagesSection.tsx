import { Box, Grid, styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AdvantageTile } from './AdvantageTile'
import { LayoutContentWrapper } from './LayoutContentWrapper'
import { Advantage } from './types'

type Props = {
  advantages: Advantage[]
  dark?: boolean
}

export const AdvantagesSection = ({ advantages, dark }: Props) => {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      sx={
        dark ? { background: '#000', color: 'primary.contrastText' } : undefined
      }
    >
      <LayoutContentWrapper>
        <Heading variant="h2">{t('landing:BENEFITS')}</Heading>
      </LayoutContentWrapper>
      <LayoutContentWrapper>
        <TilesContainer container spacing={2}>
          {advantages.map(advantage => (
            <Grid item xs={12} md={6} lg={3} key={advantage.title}>
              <AdvantageTile advantage={advantage} />
            </Grid>
          ))}
        </TilesContainer>
      </LayoutContentWrapper>
    </Box>
  )
}

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

const TilesContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}))
