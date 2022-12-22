import { Add as AddIcon } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'

import { OptionalLinkWrapper } from '@/components/links/optional-link'

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
  <Card
    onClick={onClick}
    sx={({ palette }) => ({
      background: secondary ? palette.secondary.main : undefined,
    })}
  >
    <CardActionArea sx={{ height: '100%' }}>
      <OptionalLinkWrapper href={linkTo}>
        <CardContent
          sx={theme => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: underText ? 'space-between' : 'center',
            gap: underText ? undefined : theme.spacing(1),
          })}
        >
          {underText ? (
            <div>
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
                fontSize={16}
              >
                {title}
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
          <Avatar
            sx={{
              marginRight: underText ? undefined : '-2rem',
              backgroundColor: 'primary.main',
            }}
          >
            {icon || <AddIcon />}
          </Avatar>
        </CardContent>
      </OptionalLinkWrapper>
    </CardActionArea>
  </Card>
)
