import { Box, TextField } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { BasicCombo } from '@/components/combo/basicCombo'
import { Loader } from '@/components/loader/loader'
import { useUser } from '@/modules/auth/hooks'
import { useOrdersList } from '@/modules/orders/hooks'
import { mapOrdersListToComboOptions } from '@/modules/orders/utils'
import { usePlayersList } from '@/modules/players/hooks'
import { mapPlayersListToComboOptions } from '@/modules/players/utils'

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
      <BasicCombo
        data={orders ? mapOrdersListToComboOptions(orders) : []}
        name="orderId"
        label={t('ORDER')}
        error={touched.orderId && !!errors.orderId}
        helperText={touched.orderId ? errors.orderId : undefined}
      />
      <BasicCombo
        data={players ? mapPlayersListToComboOptions(players) : []}
        name="playerId"
        label={t('PLAYER')}
        error={touched.playerId && !!errors.playerId}
        helperText={touched.playerId ? errors.playerId : undefined}
        filterBeforeComma
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
