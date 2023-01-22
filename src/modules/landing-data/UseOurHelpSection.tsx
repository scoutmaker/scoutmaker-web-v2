import { Grid, styled, Typography } from '@mui/material'

import { GoToSectionButton } from '@/components/landing/GoToSectionButton'
import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper'

const points = [
  'Twoja akademia organizuje nabory testowe',
  'jesteś zainteresowany najlepszymi piłkarzami w swoim regionie',
  'możesz wzmocnić kadrę najlepszymi piłkarzami z niżej notowanych lig',
  'szukasz zawodników poza swoim województwem',
  'potrzebujesz uzupełnień zespołu zawodnikami szukającymi minut',
]

export const UseOurHelpSection = () => (
  <Container>
    <LayoutContentWrapper>
      <Heading variant="h2">Skorzystaj z naszego wsparcia, jeśli</Heading>
      <TilesContainer container component="ul">
        {points.map(point => (
          <TitleGrid item component="li" xs={12} key={point}>
            <Typography>{point}</Typography>
          </TitleGrid>
        ))}
      </TilesContainer>
      <GoToSectionButton text="Dowiedz się więcej" href="#howdowework" />
    </LayoutContentWrapper>
  </Container>
)

const Container = styled('section')(({ theme }) => ({
  paddingBottom: theme.spacing(4),
  background: '#000',
  color: theme.palette.primary.contrastText,
}))

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  paddingTop: theme.spacing(4),

  [theme.breakpoints.down('md')]: {
    fontSize: 36,
    textAlign: 'center',
  },
}))

const TitleGrid = styled(Grid)(({ theme }) => ({
  fontSize: 23,
  fontWeight: theme.typography.fontWeightBold,
  marginBottom: theme.spacing(0.6),
  padding: theme.spacing(1),
})) as typeof Grid

const TilesContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
  justifyContent: 'space-between',
})) as typeof Grid
