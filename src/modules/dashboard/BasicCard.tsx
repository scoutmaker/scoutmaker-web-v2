import { Add as AddIcon } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardContent,
  styled,
  Typography,
} from '@mui/material'

import { OptionalLinkWrapper } from '@/components/links/optional-link'

import { StyledAvatar } from './StyledAvatar'

interface IBasicCardProps {
  linkTo?: string
  title: string
  icon?: JSX.Element
  underText?: string
  onClick?: () => void
  secondary?: boolean
}

export const BasicCard = ({
  linkTo,
  title,
  icon,
  underText,
  onClick,
  secondary,
}: IBasicCardProps) => (
  <Card onClick={onClick}>
    <OptionalLinkWrapper href={linkTo}>
      <CardActionArea sx={{ height: '100%' }}>
        <CardContentContainer
          sx={
            secondary
              ? ({ palette }) => ({ background: palette.secondary.main })
              : undefined
          }
        >
          {underText ? (
            <div>
              <Typography color="textPrimary" gutterBottom variant="h6">
                {title.toUpperCase()}
              </Typography>
              <Typography
                color={
                  secondary
                    ? ({ palette }) => palette.primary.contrastText
                    : 'textSecondary'
                }
                variant="h3"
                component="p"
              >
                {underText}
              </Typography>
            </div>
          ) : (
            <Typography
              variant="h6"
              color={
                secondary
                  ? ({ palette }) => palette.primary.contrastText
                  : 'textSecondary'
              }
            >
              {title}
            </Typography>
          )}
          <div>
            <StyledAvatar>{icon || <AddIcon />}</StyledAvatar>
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
