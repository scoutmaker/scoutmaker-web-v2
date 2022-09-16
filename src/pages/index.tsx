import { CssBaseline, Link, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { withSessionSsr } from '@/modules/auth/session'
import { CtaButton } from '@/modules/landing-home/CtaButton'
import { Header } from '@/modules/landing-home/Header'
import { ButtonsContainer, FlexWrapper, GoToAppButton, GoToAppContainer, HeadingText, MainContainer, WrapperImg } from '@/modules/landing-home/Home'

export const getServerSideProps = withSessionSsr(
  async ({ locale }) => {
    const translations = await serverSideTranslations(locale || 'pl', [
      'landing-home',
    ])

    return {
      props: {
        ...translations,
      },
    }
  },
)

const HomePage = () => {
  const { t } = useTranslation()

  return (<WrapperImg>
    <Header />
    <CssBaseline />
    <MainContainer>
      <FlexWrapper>
        <div>
          <HeadingText variant='h1'>
            {t('landing-home:PAGE_TITLE')}
          </HeadingText>
        </div>
        <div>
          <Typography variant="h2" align="center">
            {t('landing-home:PAGE_SUB_TITLE')}
          </Typography>
          <ButtonsContainer>
            <CtaButton
              text={t('landing-home:CLUB_SCOUTING')}
              href="/club-scouting"
            />
            <CtaButton
              text={t('landing-home:ACADEMY_SCOUTING')}
              href="/scouting-academy"
            />
            <CtaButton
              text={t('landing-home:SCOUTING_APP')}
              href="/scouting-app"
            />
            <CtaButton text={t('landing-home:DATA_ANALYSIS')} href="/data-analysis" />
          </ButtonsContainer>
        </div>
      </FlexWrapper>
      <GoToAppContainer>
        <GoToAppButton
          color="secondary"
          variant="contained"
          href="/login"
          LinkComponent={Link}
        >
          {t('landing-home:GO_TO_APP')}
        </GoToAppButton>
      </GoToAppContainer>
    </MainContainer>
  </WrapperImg>
  );
};

export default HomePage