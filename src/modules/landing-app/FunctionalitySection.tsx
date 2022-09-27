import { Grid, styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper'

import { functionalities } from './data'

export const FunctionalitySection = () => {
  const { t } = useTranslation()
  const functionalitiesTrans = functionalities(t)

  return (
    <Container>
      <LayoutContentWrapper>
        <Heading variant="h2">{t('landing-app:FUNCTIONALITIES')}</Heading>
      </LayoutContentWrapper>
      <LayoutContentWrapper>
        <TilesContainer
          container
          // @ts-ignore
          component="ul"
        >
          {functionalitiesTrans.map(functionality => (
            <TitleGrid
              item
              // @ts-ignore
              component="li"
              xl={4}
              lg={4}
              md={6}
              sm={6}
              xs={12}
              key={functionality.title}
            >
              <Title variant="h4">{functionality.title}</Title>
              <Typography>{functionality.text}</Typography>
            </TitleGrid>
          ))}
        </TilesContainer>
      </LayoutContentWrapper>
    </Container>
  )
}

const Container = styled('section')(({ theme }) => ({
  paddingBottom: theme.spacing(4),
}))

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('md')]: {
    fontSize: 36,
    textAlign: 'center',
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(1),
}))

const TitleGrid = styled(Grid)(({ theme }) => ({
  fontSize: 18,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
}))

const TilesContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
  justifyContent: 'space-between',
}))
