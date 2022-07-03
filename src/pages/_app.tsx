import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { appWithTranslation } from 'next-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'
import { createEmotionCache } from '../utils/create-emotion-cache'
import { theme } from '../styles/theme'
import { AlertsState } from '../context/alerts/AlertsState'
import { PrimaryLayout } from '../layout/primary-layout'
import { SecondaryLayout } from '../layout/secondary-layout'

const clientSideEmotionCache = createEmotionCache()

interface IMyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const secondaryLayoutRoutes = [
  '/login',
  '/register',
  '/account-confirm/[code]',
  '/password-reset/[code]',
  '/forgot-password',
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
