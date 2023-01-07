import 'nprogress/nprogress.css'
import '@/styles/fix-print.css'

import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import NProgress from 'nprogress'
import { useEffect, useState } from 'react'

import { getNProgressTemplate } from '@/components/nprogress/template'
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
  const router = useRouter()

  const shouldUseSecondaryLayout = secondaryLayoutRoutes.includes(
    appProps.router.route,
  )
  const shouldUseEmptyLayout = emptyLayoutRoutes.includes(appProps.router.route)
  const shouldUsePrimaryLayout =
    !shouldUseEmptyLayout && !shouldUseSecondaryLayout

  useEffect(() => {
    NProgress.configure({
      template: getNProgressTemplate(theme.palette.secondary.main),
    })
    const handleStart = () => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

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
