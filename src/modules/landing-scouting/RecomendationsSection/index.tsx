import { Box, Grid, styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { GoToSectionButton } from '@/components/landing/GoToSectionButton'
import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper'

import { recommendations } from '../data'
import { RecommendationCard } from './RecommendationCard'

interface IProps {
  goToSection?: string
}

export const RecommendationsSection = ({ goToSection }: IProps) => {
  const { t } = useTranslation()

  return (
    <section>
      <Container>
        <LayoutContentWrapper>
          <Heading variant="h2">
            {t('landing-scouting:RECOMENDATIONS_REST')}
          </Heading>
          <CardsContainer container spacing={3}>
            {recommendations.map(recommendation => (
              <Grid
                item
                xl={4}
                lg={4}
                md={6}
                sm={6}
                xs={12}
                key={recommendation.player}
              >
                <RecommendationCard recommendation={recommendation} />
              </Grid>
            ))}
          </CardsContainer>
          {!!goToSection && (
            <Box
              sx={theme => ({
                marginTop: theme.spacing(6),
                [theme.breakpoints.down('md')]: {
                  display: 'flex',
                  justifyContent: 'center',
                },
              })}
            >
              <GoToSectionButton text="Zgłoś się" href={goToSection} />
            </Box>
          )}
        </LayoutContentWrapper>
      </Container>
    </section>
  )
}

const Container = styled('div')(({ theme }) => ({
  background: '#000',
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
}))

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

const CardsContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))
