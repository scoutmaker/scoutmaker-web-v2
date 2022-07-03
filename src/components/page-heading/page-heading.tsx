import { Typography } from '@mui/material'

interface IPageHeadingProps {
  title: string
}

export const PageHeading = ({ title }: IPageHeadingProps) => (
  <Typography variant="h2" align="center" sx={{ marginBottom: 4 }}>
    {title}
  </Typography>
)
