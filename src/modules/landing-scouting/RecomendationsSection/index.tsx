import { Grid, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper';

import { recommendations } from '../data';
import { RecommendationCard } from './RecommendationCard';

export const RecommendationsSection = () => {
  const { t } = useTranslation()

  return (
    <section>
      <Container>
        <LayoutContentWrapper>
          <Heading variant="h2" >
            {t('landing-scouting:RECOMENDATIONS_REST')}
          </Heading>
          <CardsContainer container spacing={3}>
            {recommendations.map((recommendation) => (
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
        </LayoutContentWrapper>
      </Container>
    </section>
  );
};

const Container = styled('div')(({ theme }) => ({
  background: '#000',
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
}))

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}))

const CardsContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}))
