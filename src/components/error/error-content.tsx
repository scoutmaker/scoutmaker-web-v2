import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { separateLink } from '@/utils/separate-link'

import { PageHeading } from '../page-heading/page-heading'

interface IErrorContentProps {
  status?: number | null
  message?: string | null
}

export const ErrorContent = ({ status, message }: IErrorContentProps) => {
  const { t } = useTranslation()

  if (status === 401) {
    return (
      <Box marginTop={12}>
        <PageHeading title={t('ERROR_PAGE_401_HEADING')} />
        <Typography align="center">
          {separateLink(t('ERROR_PAGE_401_INFO'), '/club-scouting')}
        </Typography>
      </Box>
    )
  }
  return (
    <>
      <PageHeading title={t('SOMETHING_WENT_WRONG')} />
      <Typography variant="h2" align="center">
        {status || 500}
      </Typography>
      <Typography align="center" marginTop={4}>
        {message}
      </Typography>
    </>
  )
}
