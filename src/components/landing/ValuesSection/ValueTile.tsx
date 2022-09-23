import { Button, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { Value } from '../types';

type Props = {
  value: Value;
};

export const ValueTile = ({ value }: Props) => {
  const { number, title, icon, values, link } = value;
  const { t } = useTranslation()

  return (
    <Tile>
      <Heading>
        <Number>{number}</Number>
        <TitleContainer>
          <Title variant="h4" >
            {title}
          </Title>
          {icon}
        </TitleContainer>
      </Heading>
      <List>
        {values.map((valueEl) => (
          <ListItem key={valueEl}>
            {valueEl}
          </ListItem>
        ))}
      </List>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledButton
          variant="contained"
          color="secondary"
        >
          {t('landing:SEE_EXAMPLE')}
        </StyledButton>
      </Link>
    </Tile>
  );
};


const Tile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
  height: '100%',
}))

const Heading = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  marginBottom: theme.spacing(2),
}))

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  width: '100%',
}))

const Number = styled('div')(({ theme }) => ({
  fontSize: 24,
  padding: theme.spacing(2),
  borderRadius: 10,
  background: '#000',
  color: theme.palette.primary.contrastText,
  fontWeight: theme.typography.fontWeightBold,
}))

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: theme.typography.fontWeightBold,
}))

const List = styled('ul')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

const ListItem = styled('li')({
  fontSize: 16,
})

const StyledButton = styled(Button)({
  display: 'block',
  margin: '0 auto',
  marginTop: 'auto',
  width: '100%',

  '&:hover': {
    textDecoration: 'none',
  },
})
