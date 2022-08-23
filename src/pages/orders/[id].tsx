import { useTranslation } from 'next-i18next'

import { ErrorContent } from '@/components/error/error-content'
import { PageHeading } from '@/components/page-heading/page-heading'
import { OrderDetailsCard } from '@/modules/orders/details-card'
import { OrderDto } from '@/modules/orders/types'
import { getOrderById } from '@/services/api/methods/orders'
import { ApiError } from '@/services/api/types'
import { TSsrRole, withSessionSsrRole } from '@/utils/withSessionSsrRole'

export const getServerSideProps = withSessionSsrRole<OrderDto>(['common', 'orders'], ['ADMIN', 'PLAYMAKER_SCOUT'],
  async (token, params) => {
    try {
      const order = await getOrderById(
        +(params?.id as string),
        token,
      )
      return { data: order }
    } catch (error) {
      return { data: null, error: error as ApiError }
    }
  });

const OrderPage = ({ data, errorMessage, errorStatus }: TSsrRole<OrderDto>) => {
  const { t } = useTranslation()

  if (!data || errorStatus) return <ErrorContent message={errorMessage} status={errorStatus} />
  return (
    <>
      <PageHeading title={t('orders:SINGLE_PAGE', { nr: `${data.id}/${new Date(data.createdAt).getFullYear()}` })}
      />
      <OrderDetailsCard order={data} />
    </>
  )
}
export default OrderPage
