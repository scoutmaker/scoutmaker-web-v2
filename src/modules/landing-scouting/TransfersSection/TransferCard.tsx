import { Repeat as RepeatIcon } from '@mui/icons-material';
import { Box, Button, styled, Typography } from "@mui/material";
import Image from 'next/future/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { Transfer } from "../data";

type Props = {
  transfer: Transfer;
};

export const TransferCard = ({ transfer }: Props) => {
  const { player, from, to, reportLink } = transfer;
  const { t } = useTranslation()

  return (
    <Card>
      <ImageContainer>
        <Image src={player.image} alt={player.name} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      </ImageContainer>
      <ContentContainer>
        <Name variant="h4" gutterBottom >
          {player.name}
        </Name>
        <TransferCont>
          <div>
            <Club>
              <Typography>{from.name}</Typography>
              <Box marginLeft={(theme) => theme.spacing(2)}>
                <Image src={from.logo} alt={from.name} height={30} width={35} />
              </Box>
            </Club>
            <Club>
              <Typography>{to.name}</Typography>
              <Image src={to.logo} alt={to.name} height={30} width={35} />
            </Club>
          </div>
          <RepeatIcon />
        </TransferCont>
      </ContentContainer>
      <Link
        href={reportLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledButton
          color="secondary"
          variant="contained"
          fullWidth
        >
          {t('landing-scouting:SEE_REPORT')}
        </StyledButton>
      </Link>
    </Card >
  );
};

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.primary.contrastText,
  color: theme.palette.primary.main,
  borderRadius: 20,
  overflow: 'hidden',
  margin: '0 auto',
}))

const ImageContainer = styled('div')({
  height: 300,
  alignSelf: 'center',
})

// const Image = styled('img')({
//   height: '100%',
//   objectFit: 'contain',
// })

const ContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 3),
}))

const Name = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  fontWeight: theme.typography.fontWeightBold,
}))

const TransferCont = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}))

// const Logo = styled('img')(({ theme }) => ({
//   height: 30,
//   marginLeft: theme.spacing(2),
// }))

const Club = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
}))

const StyledButton = styled(Button)({
  display: 'block',
  marginTop: 'auto',
})
