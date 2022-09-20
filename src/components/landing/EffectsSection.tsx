import { Grid, styled, Typography } from "@mui/material";

import { EffectCard } from "./EffectCard";
import { LayoutContentWrapper } from "./LayoutContentWrapper";
import { Effect } from "./types";

interface IProps {
  title: string
  effects: Effect[]
}

export const EffectsSection = ({ title, effects }: IProps) => (
  <Container>
    <LayoutContentWrapper>
      <Heading variant="h2">
        {title}
      </Heading>
      <CardsContainer
        container
        spacing={3}
      // justifyContent="space-between" CHECK
      >
        {effects.map((effect) => (
          <Grid
            item
            key={effect.name}
            xl={3}
            lg={3}
            sm={6}
            xs={12}
            alignItems="stretch"
          >
            <EffectCard
              title={effect.name}
              text={effect.text}
              logo={effect.logo}
              link={effect.link}
            />
          </Grid>
        ))}
      </CardsContainer>
    </LayoutContentWrapper>
  </Container>
);

const Container = styled('section')(({ theme }) => ({
  paddingBottom: theme.spacing(4),
}))

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('sm')]: {
    fontSize: 36,
    textAlign: 'center',
  },
}))

const CardsContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
}))