import { Box, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { Loader } from '@/components/loader/loader'
import { useUser } from '@/modules/auth/hooks'
import { OrdersCombo } from '@/modules/orders/combo'
import { useOrdersList } from '@/modules/orders/hooks'
import { PlayersCombo } from '@/modules/players/combo'
import { usePlayersList } from '@/modules/players/hooks'

import { CreateReportDto } from '../../types'

export const OrderStep = () => {
  const { t } = useTranslation()
  const { touched, errors, values } = useFormikContext<CreateReportDto>()

  const { data: user, isLoading: userLoading } = useUser()

  const { data: orders, isLoading: ordersLoading } = useOrdersList({
    userId: user?.id,
    status: 'ACCEPTED',
  })
  const { data: players, isLoading: playersLoading } = usePlayersList({
    orderId: values.orderId,
  })

  const isLoading = playersLoading || userLoading || ordersLoading

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {isLoading && <Loader />}
      <OrdersCombo
        data={orders || []}
        name="orderId"
        label={t('ORDER')}
        error={touched.orderId && !!errors.orderId}
        helperText={touched.orderId ? errors.orderId : undefined}
      />
      <PlayersCombo
        data={players || []}
        name="playerId"
        label={t('PLAYER')}
        error={touched.playerId && !!errors.playerId}
        helperText={touched.playerId ? errors.playerId : undefined}
      />
      <Field
        name="shirtNo"
        as={TextField}
        type="number"
        inputProps={{ min: 1, max: 99 }}
        variant="outlined"
        fullWidth
        label={t('SHIRT_NO')}
        error={touched.shirtNo && !!errors.shirtNo}
        helperText={touched.shirtNo && errors.shirtNo}
      />
    </Box>
  )
}
