import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import CountUp from 'react-countup'

import { OptionalLinkWrapper } from '@/components/links/optional-link'

interface ICountCardProps {
  title: string
  count?: number
  linkTo?: string
}

export const CountCard = ({ linkTo, title, count }: ICountCardProps) => (
  <Card sx={{ height: '100%' }}>
    <OptionalLinkWrapper href={linkTo}>
      <CardActionArea sx={{ height: '100%' }}>
        <CardContent>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
            fontSize={16}
            textAlign="center"
          >
            {title}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
            component="p"
            textAlign="center"
          >
            {count ? <CountUp end={count} useEasing /> : 0}
          </Typography>
        </CardContent>
      </CardActionArea>
    </OptionalLinkWrapper>
  </Card>
)
