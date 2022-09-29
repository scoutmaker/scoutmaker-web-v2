import {
  Card,
  CardActionArea,
  CardContent,
  styled,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { ReactElement } from 'react'
import CountUp from 'react-countup'

import { StyledAvatar } from './StyledAvatar'

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
)

const CardContentContainer = styled(CardContent)({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})
