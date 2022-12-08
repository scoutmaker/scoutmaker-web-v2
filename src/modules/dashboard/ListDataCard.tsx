import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material'

import { OptionalLinkWrapper } from '@/components/links/optional-link'

import { StyledAvatar } from './StyledAvatar'

interface IListDataCardProps {
  title: string
  items: JSX.Element | JSX.Element[] | string
  subheader: string
  icon: JSX.Element
  linkTo?: string
}

const ListDataCard = ({
  items,
  icon,
  subheader,
  title,
  linkTo,
}: IListDataCardProps) => (
  <Card sx={{ margin: '0 auto', width: '100%' }}>
    <CardActionArea>
      <OptionalLinkWrapper href={linkTo}>
        <CardHeader
          avatar={
            <StyledAvatar aria-label={`${title} icon`} secondary>
              {icon}
            </StyledAvatar>
          }
          title={title.toUpperCase()}
          titleTypographyProps={{ variant: 'h6', color: 'textSecondary' }}
          subheader={subheader}
        />
      </OptionalLinkWrapper>
    </CardActionArea>
    {(!Array.isArray(items) || !!items.length) && (
      <CardContent sx={theme => ({ marginTop: theme.spacing(-2.2) })}>
        <Grid container>{items}</Grid>
      </CardContent>
    )}
  </Card>
)
export default ListDataCard
