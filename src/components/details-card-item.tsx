import { Grid, Typography } from "@mui/material"

interface IitemProps {
  categ: string
  value: string
}
export const CardItemBasic = ({ categ, value }: IitemProps) =>
(<Grid item xs={12}>
  <Typography>
    <strong>{categ}: </strong>
    {value}
  </Typography>
</Grid>)

