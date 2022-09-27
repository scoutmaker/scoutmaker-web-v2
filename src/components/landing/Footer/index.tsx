import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  LocalPhone as PhoneIcon,
  Mail as MailIcon,
  Twitter as TwitterIcon,
} from '@mui/icons-material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import logoWhite from '@/assets/logo-white.png'

import { LayoutContentWrapper } from '../LayoutContentWrapper'
import {
  ContactContainer,
  ContactLink,
  Container,
  Divider,
  IconsWrapper,
  InnerWrapper,
  LinksContainer,
  PlaymakerLogo,
  SocialIconsContainer,
  SocialLink,
} from './components'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <LayoutContentWrapper>
        <InnerWrapper>
          <IconsWrapper>
            <PlaymakerLogo src={logoWhite.src} alt="Scoutmaker logo" />
            <SocialIconsContainer>
              <SocialLink href="https://www.facebook.com/playmakerpropl/">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/playmaker.pro/">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="https://twitter.com/ProPlaymaker">
                <TwitterIcon />
              </SocialLink>
              <SocialLink href="https://pl.linkedin.com/company/playmaker-pro">
                <LinkedInIcon />
              </SocialLink>
            </SocialIconsContainer>
          </IconsWrapper>
          <LinksContainer>
            <Link href="/club-scouting">{t('landing:CLUB_SCOUTING')}</Link>
            <Link href="/scouting-app">{t('landing:SCOUTING_APP')}</Link>
            <Link href="/data-analysis">{t('landing:DATA_ANALYSIS')}</Link>
            <Link href="/scouting-academy">
              {t('landing:SCOUTING_ACADEMY')}
            </Link>
          </LinksContainer>
          <Divider orientation="vertical" />
          <ContactContainer>
            <ContactLink href="tel:+48504271466">
              <>
                <PhoneIcon />
                +48 504 271 466
              </>
            </ContactLink>
            <ContactLink href="mailto:biuro@playmaker.pro">
              <>
                <MailIcon />
                biuro@playmaker.pro
              </>
            </ContactLink>
          </ContactContainer>
        </InnerWrapper>
      </LayoutContentWrapper>
    </Container>
  )
}
