import {
  Card,
  CardActionArea,
  CardContent,
  styled,
  Typography,
} from '@mui/material'
import { ReactElement } from 'react'
import CountUp from 'react-countup'

import { OptionalLinkWrapper } from '@/components/links/optional-link'

import { StyledAvatar } from './StyledAvatar'

interface ICountCardProps {
  title: string
  count?: number
  icon: ReactElement
  linkTo?: string
  text?: string | JSX.Element
}

export const CountCard = ({
  icon,
  linkTo,
  title,
  count,
  text,
}: ICountCardProps) => (
  <Card>
    <OptionalLinkWrapper href={linkTo}>
      <CardActionArea>
        <CardContentContainer>
          <div>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography color="textPrimary" variant="h3" component="p">
              {count ? <CountUp end={count} useEasing /> : 0} {text}
            </Typography>
          </div>
          <div>
            <StyledAvatar>{icon}</StyledAvatar>
          </div>
        </CardContentContainer>
      </CardActionArea>
    </OptionalLinkWrapper>
  </Card>
)

const CardContentContainer = styled(CardContent)({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})
