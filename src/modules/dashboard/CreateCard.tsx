import { Add as AddIcon } from '@mui/icons-material'
import { Avatar, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Link from 'next/link';

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

const CardContentContainer = ({ children }: any) => (
  <CardContent sx={(theme) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: theme.palette.secondary.main,
  })}>{children}</CardContent>)

const StyledAvatar = ({ children }: any) => (<Avatar sx={(theme) => ({
  backgroundColor: theme.palette.primary.main,
  height: 56,
  width: 56,
})}>{children}</Avatar>)

