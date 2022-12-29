import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  Link as MuiLink,
  Typography,
} from '@mui/material'

import { OptionalLinkWrapper } from '@/components/links/optional-link'

interface IListDataCardProps {
  title: string
  items: { id: string; text: React.ReactElement | string; linksPage?: string }[]
  linkTo?: string
}

const ListDataCard = ({ title, items, linkTo }: IListDataCardProps) => (
  <Card sx={{ margin: '0 auto', width: '100%' }}>
    <CardActionArea>
      <OptionalLinkWrapper href={linkTo}>
        <CardHeader
          title={title}
          titleTypographyProps={{
            variant: 'h6',
            color: 'textSecondary',
            textAlign: 'center',
          }}
        />
      </OptionalLinkWrapper>
    </CardActionArea>
    <CardContent sx={theme => ({ marginTop: theme.spacing(-2.2) })}>
      {items.map(({ id, text, linksPage }) => (
        <Grid item xs={12} key={id} justifyContent="center" display="flex">
          <OptionalLinkWrapper
            href={linksPage ? `/${linksPage}/${id}` : undefined}
            passHref
          >
            <Typography component={MuiLink}>{text}</Typography>
          </OptionalLinkWrapper>
        </Grid>
      ))}
    </CardContent>
  </Card>
)
export default ListDataCard
