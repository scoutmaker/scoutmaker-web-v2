import { Grid, styled, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

import { LayoutContentWrapper } from "../LayoutContentWrapper";
import { Value } from "../types";
import { ValueTile } from "./ValueTile";

type Props = { values: Value[] };

export const ValuesSection = ({ values }: Props) => {
  const { t } = useTranslation()

  return (
    <Container>
      <Shape />
      <LayoutContentWrapper>
        <Heading variant="h2" >
          {t('landing:HOW_DO_WE_WORK')}
        </Heading>
        <Grid container spacing={4}>
          {values.map((value) => (
            <Grid item xs={12} md={6} lg={3} key={value.number}>
              <ValueTile value={value} />
            </Grid>
          ))}
        </Grid>
      </LayoutContentWrapper>
    </Container>
  )
};


const Container = styled('section')(({ theme }) => ({
  paddingBottom: theme.spacing(4),
  overflow: 'hidden',
  position: 'relative',
}))

const Shape = styled('div')({
  position: 'absolute',
  top: -1,
  left: 0,
  width: '100%',
  height: 50,
  background: '#000',
  clipPath: `polygon(
    0 0,
    100% 0,
    100% calc(100% - 20px),
    0 100%
  )`,
})

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: 48,
  padding: theme.spacing(8, 0),

  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}))
