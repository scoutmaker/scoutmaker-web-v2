import { styled, Typography } from "@mui/material";
import { ReactNode } from "react";
import CountUp from 'react-countup'

interface IProps {
  title: string
  count?: number
  icon: ReactNode
}

export const AppNumber = ({ title, count, icon }: IProps) => (
  <div>
    <Typography fontSize={26}>
      {count ? <CountUp end={count} /> : 0}
    </Typography>
    <TitleContainer>
      <Typography textTransform='uppercase' fontSize={18}>{title}</Typography>
      {icon}
    </TitleContainer>
  </div>
);

const TitleContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}))