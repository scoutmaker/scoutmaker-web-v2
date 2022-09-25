import { Add as AddIcon } from '@mui/icons-material'
import { Card, CardActionArea, CardContent, styled, Typography } from "@mui/material";
import Link from 'next/link';
import { StyledAvatar } from "./StyledAvatar";

interface ICreateCardProps {
  linkTo: string
  title: string
}

export const CreateCard = ({ linkTo, title }: ICreateCardProps) => (
  <Card>
    <Link
      href={linkTo}
    >
      <CardActionArea sx={{ height: '100%' }}>
        <CardContentContainer>
          <Typography variant="h6" color={(theme) => theme.palette.primary.contrastText}>
            {title}
          </Typography>
          <div>
            <StyledAvatar>
              <AddIcon />
            </StyledAvatar>
          </div>
        </CardContentContainer>
      </CardActionArea>
    </Link>
  </Card>
);

const CardContentContainer = styled(CardContent)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.secondary.main,
}))
