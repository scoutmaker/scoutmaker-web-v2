import { Avatar, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";
import CountUp from "react-countup";

interface ICountCardProps {
  title: string
  count?: number
  icon: ReactElement
  linkTo: string
}

export const CountCard = ({ icon, linkTo, title, count }: ICountCardProps) => (
  <Card>
    <Link href={linkTo}>
      <CardActionArea>
        <CardContentContainer>
          <div>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h3" component="p">
              {count ? <CountUp end={count} useEasing /> : 0}
            </Typography>
          </div>
          <div>
            <StyledAvatar>{icon}</StyledAvatar>
          </div>
        </CardContentContainer>
      </CardActionArea>
    </Link>
  </Card>
);

const CardContentContainer = ({ children }: any) => (
  <CardContent sx={{
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}>{children}</CardContent>)

const StyledAvatar = ({ children }: any) => (<Avatar sx={(theme) => ({
  backgroundColor: theme.palette.primary.main,
  height: 56,
  width: 56,
})}>{children}</Avatar>)

