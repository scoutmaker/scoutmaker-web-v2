import { Box, List, styled } from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

import { DataAnalysisAppNumbers } from '../../AppNumbers/data-analysis'
import { GoToSectionButton } from '../../GoToSectionButton'
import { LayoutContentWrapper } from '../../LayoutContentWrapper'
import { ListElement } from '../../ListElement'
import {
  ButtonContainer,
  Container,
  Heading,
  ImageContainer,
  InnerContainer,
} from '../components'

interface IProps {
  backgroundImage: string
  image: {
    img: StaticImageData
    alt: string
  }
  title: ReactNode
  features: string[]
}

const DataAnalysisHeroSection = ({
  backgroundImage,
  image,
  title,
  features,
}: IProps) => (
  <Container backgroundImage={backgroundImage}>
    <LayoutContentWrapper>
      <InnerContainer>
        <ImageContainer>
          <Box
            width="80%"
            display="flex"
            sx={theme => ({
              [theme.breakpoints.up('lg')]: {
                display: 'none',
              },
            })}
          >
            <Image src={image.img} alt={image.alt} />
          </Box>
        </ImageContainer>
        <ContentContainer>
          <Box display="flex" flexDirection="column">
            <Heading variant="h2">{title}</Heading>
            <Box component={List} fontSize="36">
              {features.map(feature => (
                <ListElement text={feature} key={feature} />
              ))}
            </Box>
            <ButtonContainer>
              <GoToSectionButton text="Poznajmy się" href="#contactform" />
            </ButtonContainer>
          </Box>

          <DataAnalysisAppNumbers />
        </ContentContainer>
      </InnerContainer>
    </LayoutContentWrapper>
  </Container>
)

export default DataAnalysisHeroSection

const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 36,
  margin: '0 auto',
})
