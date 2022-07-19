import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

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

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AlertsState>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {shouldUseSecondaryLayout ? (
              <SecondaryLayout>
                <Component {...pageProps} />
              </SecondaryLayout>
            ) : (
              <PrimaryLayout>
                <Component {...pageProps} />
              </PrimaryLayout>
            )}
          </ThemeProvider>
        </AlertsState>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
