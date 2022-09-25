import {
  Card,
  CardContent,
  CardHeader,
  styled,
  Typography,
} from '@mui/material';

type Props = {
  title: string;
  subtitle: string;
  text: string;
};

export const TestimonialCard = ({ title, subtitle, text }: Props) => (
  <Container >
    <Header
      title={title}
      subheader={subtitle}
      subheaderTypographyProps={{ sx: (theme) => ({ color: theme.palette.secondary.contrastText }) }}
    />
    <CardContent>
      <Typography>{text}</Typography>
    </CardContent>
  </Container>
);

const Container = styled(Card)({
  height: '100%',
})

const Header = styled(CardHeader)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.primary.contrastText,
}))