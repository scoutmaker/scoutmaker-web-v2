import { Box, List } from "@mui/material";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

import { AppNumbers } from "../AppNumbers";
import { GoToSectionButton } from "../GoToSectionButton";
import { LayoutContentWrapper } from "../LayoutContentWrapper";
import { ListElement } from "../ListElement";
import { ButtonContainer, Container, ContentContainer, Heading, ImageContainer, InnerContainer } from "./components";

interface IProps {
  backgroundImage: string
  image: {
    src: string
    alt: string
  }
  title: ReactNode
  features: string[]
  displayAppNumbers?: boolean
}

const HeroSection = ({
  backgroundImage,
  image,
  title,
  features,
  displayAppNumbers,
}: IProps) => {
  const { t } = useTranslation()

  return (
    <Container backgroundImage={backgroundImage}>
      <LayoutContentWrapper>
        <InnerContainer>
          <ImageContainer>
            <Box component='img' src={image.src} alt={image.alt} width='80%' />
          </ImageContainer>
          <ContentContainer>
            <Heading variant="h2">
              {title}
            </Heading>
            <Box component={List} fontSize='36'>
              {features.map((feature) => (
                <ListElement text={feature} key={feature} />
              ))}
            </Box>
            <ButtonContainer>
              <GoToSectionButton text={t('landing:SEE_DETAILS')} href="#copy" />
            </ButtonContainer>
            {displayAppNumbers && <AppNumbers />}
          </ContentContainer>
        </InnerContainer>
      </LayoutContentWrapper>
    </Container>
  );
};

export default HeroSection
