import { Button, Card, CardActions, CardContent, styled, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "next-i18next";

interface IProps {
  title: string
  text: string
  logo: string
  link: string
}

export const EffectCard = ({ title, text, logo, link }: IProps) => {
  const { t } = useTranslation()

  return (
    <CustomCard>
      <CardContent>
        <ImageContainer>
          <Image src={logo} alt={title} />
        </ImageContainer>
        <Title variant="h4">
          {title}
        </Title>
        <Typography>{text}</Typography>
      </CardContent>
      <CardActions>
        <CustomLink
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CustomButtom
            color="secondary"
            variant="contained"
          >
            {t('landing:SEE')}
          </CustomButtom>
        </CustomLink>
      </CardActions>
    </CustomCard>
  );
};

const CustomCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const ImageContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

const Image = styled('img')({
  height: 200,
  margin: '0 auto',
})

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: theme.typography.fontWeightBold,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}))

const CustomLink = styled(Link)({
  display: 'block',
  width: '100%',

  '&:hover': {
    textDecoration: 'none',
  }
})

const CustomButtom = styled(Button)({
  width: '100%',
})
