import { Box, styled, Typography } from "@mui/material";
import { ReactNode } from "react";

import { LayoutContentWrapper } from "./LayoutContentWrapper";

interface IProps {
  title: ReactNode
  text: string | ReactNode
  image: {
    src: string
    alt: string
  }
}

export const CopySection = ({ title, text, image }: IProps) => (
  <Wrapper id="copy">
    <LayoutContentWrapper>
      <Container>
        <Box flexBasis='80%'>
          <Heading>
            {title}
          </Heading>
          <Text>{text}</Text>
        </Box>
        <ImageContainer>
          <Box component='img' src={image.src} alt={image.alt} width='100%' />
        </ImageContainer>
      </Container>
    </LayoutContentWrapper>
  </Wrapper>
);

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5%',
  padding: theme.spacing(4, 0),

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    gap: theme.spacing(4),
  },
}))

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  fontWeight: theme.typography.fontWeightBold,
  margin: theme.spacing(2, 0),

  '& em': {
    color: theme.palette.secondary.main,
    fontStyle: 'normal',
  },

  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

const Text = styled(Typography)(({ theme }) => ({
  '& em': {
    color: theme.palette.secondary.main,
    fontStyle: 'normal',
  },
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

const ImageContainer = styled('div')(({ theme }) => ({
  flexBasis: '15%',

  [theme.breakpoints.down('md')]: {
    width: '40%',
  },
}))

const Wrapper = styled('section')(({ theme }) => ({
  background: '#000',
  color: theme.palette.primary.contrastText,
}))