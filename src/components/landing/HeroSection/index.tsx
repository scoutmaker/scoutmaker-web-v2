import { Box, List } from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

import { LandingPageNumbers } from '@/modules/landing-home/types'

import { AppNumbers } from '../AppNumbers'
import { GoToSectionButton } from '../GoToSectionButton'
import { LayoutContentWrapper } from '../LayoutContentWrapper'
import { ListElement } from '../ListElement'
import {
  ButtonContainer,
  Container,
  ContentContainer,
  Heading,
  ImageContainer,
  InnerContainer,
} from './components'

interface IProps {
  backgroundImage: string
  image: {
    img: StaticImageData
    alt: string
  }
  title: ReactNode
  features: string[]
  appNumbers?: LandingPageNumbers
  letsMeetVariant?: boolean
}

const HeroSection = ({
  backgroundImage,
  image,
  title,
  features,
  appNumbers,
  letsMeetVariant,
}: IProps) => {
  const { t } = useTranslation()

  return (
    <Container backgroundImage={backgroundImage}>
      <LayoutContentWrapper>
        <InnerContainer>
          <ImageContainer>
            <Box width="80%" display="flex">
              <Image src={image.img} alt={image.alt} />
            </Box>
          </ImageContainer>
          <ContentContainer>
            <Heading variant="h2">{title}</Heading>
            <Box component={List} fontSize="36">
              {features.map(feature => (
                <ListElement text={feature} key={feature} />
              ))}
            </Box>
            <ButtonContainer>
              {letsMeetVariant ? (
                <GoToSectionButton text="Poznajmy się" href="#contactform" />
              ) : (
                <GoToSectionButton
                  text={t('landing:SEE_DETAILS')}
                  href="#copy"
                />
              )}
            </ButtonContainer>
            {!!appNumbers && <AppNumbers numbers={appNumbers} />}
          </ContentContainer>
        </InnerContainer>
      </LayoutContentWrapper>
    </Container>
  )
}

export default HeroSection
