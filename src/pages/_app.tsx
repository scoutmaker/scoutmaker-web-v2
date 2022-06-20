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

const clientSideEmotionCache = createEmotionCache()

interface IMyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: IMyAppProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
