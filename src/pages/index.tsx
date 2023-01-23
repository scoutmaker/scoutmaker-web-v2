import { CssBaseline, Link, Typography } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { CtaButton } from '@/modules/landing-home/CtaButton'
import { Header } from '@/modules/landing-home/Header'
import {
  ButtonsContainer,
  FlexWrapper,
  GoToAppButton,
  GoToAppContainer,
  HeadingText,
  MainContainer,
  WrapperImg,
} from '@/modules/landing-home/Home'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const translations = await serverSideTranslations(locale || 'pl', [
    'landing',
    'landing-home',
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <WrapperImg>
      <Header />
      <CssBaseline />
      <MainContainer>
        <FlexWrapper>
          <div>
            <HeadingText variant="h1">
              {t('landing-home:PAGE_TITLE')}
            </HeadingText>
          </div>
          <div>
            <Typography variant="h2" align="center">
              {t('landing-home:PAGE_SUB_TITLE')}
            </Typography>
            <ButtonsContainer>
              <CtaButton
                text={t('landing:OBSERVATION_SCOUTING')}
                href="/club-scouting"
              />
              <CtaButton
                text={t('landing:DATA_ANALYSIS')}
                href="/data-analysis"
              />
              <CtaButton
                text={t('landing:SCOUTING_APP')}
                href="/scouting-app"
              />
              <GoToAppContainer>
                <GoToAppButton
                  color="secondary"
                  variant="contained"
                  href="/dashboard"
                  LinkComponent={Link}
                >
                  {t('landing-home:GO_TO_APP')}
                </GoToAppButton>
              </GoToAppContainer>
            </ButtonsContainer>
          </div>
        </FlexWrapper>
      </MainContainer>
    </WrapperImg>
  )
}

export default HomePage
