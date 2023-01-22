import { styled, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { GoToSectionButton } from '@/components/landing/GoToSectionButton'
import { LayoutContentWrapper } from '@/components/landing/LayoutContentWrapper'

import { methodology } from './data'
import { ListItem } from './ListItem'

export const HowDoWeWorkSection = () => {
  const { t } = useTranslation()
  const methodologyData = methodology(t)

  return (
    <Container id="howdowework">
      <LayoutContentWrapper>
        <Heading variant="h2">{t('landing:HOW_DO_WE_WORK')}</Heading>
        <ContentContainer>
          {methodologyData.map(item => (
            <ListItem key={item.number} number={item.number} text={item.text} />
          ))}
        </ContentContainer>
        <GoToSectionButton text="Skontaktuj się" href="#contactform" />
      </LayoutContentWrapper>
    </Container>
  )
}

const Container = styled('section')(({ theme }) => ({
  background: '#000',
  paddingBottom: theme.spacing(4),
}))

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3, 0),

  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

const ContentContainer = styled('li')({
  listStyle: 'none',
  paddingBottom: 20,
})
