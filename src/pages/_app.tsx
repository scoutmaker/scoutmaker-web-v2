import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { useState } from 'react'

import { AlertsState } from '@/context/alerts/AlertsState'
import { PrimaryLayout } from '@/layout/primary-layout'
import { SecondaryLayout } from '@/layout/secondary-layout'
import { theme } from '@/styles/theme'
import { createEmotionCache } from '@/utils/create-emotion-cache'

const clientSideEmotionCache = createEmotionCache()

interface IMyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const secondaryLayoutRoutes = [
  '/login',
  '/register',
  '/account-confirm/[code]',
  '/password-reset/[token]',
  '/forgot-password',
  '/test',
]

const emptyLayoutRoutes = [
  '/',
  '/data-analysis',
  '/club-scouting',
  '/scouting-academy',
  '/scouting-app',
]

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  ...appProps
}: IMyAppProps) => {
  const [queryClient] = useState(() => new QueryClient())

  const shouldUseSecondaryLayout = secondaryLayoutRoutes.includes(
    appProps.router.route,
  )
  const shouldUseEmptyLayout = emptyLayoutRoutes.includes(appProps.router.route)
  const shouldUsePrimaryLayout =
    !shouldUseEmptyLayout && !shouldUseSecondaryLayout

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AlertsState>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {shouldUsePrimaryLayout && (
              <PrimaryLayout>
                <Component {...pageProps} />
              </PrimaryLayout>
            )}
            {shouldUseSecondaryLayout && (
              <SecondaryLayout>
                <Component {...pageProps} />
              </SecondaryLayout>
            )}
            {shouldUseEmptyLayout && <Component {...pageProps} />}
          </ThemeProvider>
        </AlertsState>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
