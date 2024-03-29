import { AutocompleteRenderInputParams, TextField } from '@mui/material'
import { Field } from 'formik'
import { Autocomplete } from 'formik-mui'
import { useTranslation } from 'next-i18next'

import { IComboProps } from '@/types/combo'

import { OrderBasicDataDto } from './types'
import { getOrderDisplayName } from './utils'

interface IOrdersComboProps extends IComboProps<OrderBasicDataDto> {}

export const OrdersCombo = ({
  data,
  name,
  label,
  multiple,
  size,
  error,
  helperText,
}: IOrdersComboProps) => {
  const { t } = useTranslation()

  return (
    <Field
      name={name}
      component={Autocomplete}
      multiple={multiple}
      id={name}
      size={size}
      options={['', ...data.map(order => order.id)]}
      getOptionLabel={(option: string) => {
        if (option === '') {
          return ''
        }
        const order = data.find(c => c.id === option)
        if (order) {
          const { createdAt, match, player, docNumber } = order
          return getOrderDisplayName({
            docNumber,
            createdAt,
            match,
            player,
          })
        }
        return t('NONE')
      }}
      filterSelectedOptions
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label || t('ORDER')}
          placeholder={label || t('ORDER')}
        />
      )}
    />
  )
}
