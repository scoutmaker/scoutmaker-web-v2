import { Repeat as RepeatIcon } from '@mui/icons-material';
import { Button, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { Recommendation } from '../data';

type Props = {
  recommendation: Recommendation;
};

export const RecommendationCard = ({ recommendation }: Props) => {
  const { player, from, to, reportLink } = recommendation;
  const { t } = useTranslation()

  return (
    <Card>
      <ContentContainer>
        <Name variant="h4" gutterBottom>
          {player}
        </Name>
        <Transfer>
          <div>
            <Typography>{from}</Typography>
            <Typography>{to}</Typography>
          </div>
          <RepeatIcon />
        </Transfer>
      </ContentContainer>
      <Link
        href={reportLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledButton
          color="secondary"
          variant="contained"
        >
          {t('landing-scouting:SEE_REPORT')}
        </StyledButton>
      </Link>
    </Card>
  );
};

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.primary.contrastText,
  margin: '0 auto',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.primary.contrastText}`,
  borderRadius: 5,
}))

const ContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 3),
}))

const Name = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: theme.typography.fontWeightBold,
}))

const Transfer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

const StyledButton = styled(Button)({
  marginTop: 'auto',
  alignSelf: 'flex-end',
})
