import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import { useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { isMobile as reactDetectIsMobile } from 'react-device-detect';
import { ThemeProvider } from 'next-themes';
import ModalsContainer from '@/components/modal-views/container';
import DrawersContainer from '@/components/drawer-views/container';
// base css file
import 'swiper/css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';
import '@/assets/css/range-slider.css';
import { Web3Provider } from "@/contexts/Web3Context";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  //could remove this if you don't need to page level layout
  return (
    <>
      <Head>
        {/* maximum-scale 1 meta tag need to prevent ios input focus auto zooming */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider
                attribute="class"
                enableSystem={false}
                defaultTheme="dark"
              >
                  <Web3Provider>
                    {getLayout(<Component {...pageProps} />)}
                  </Web3Provider>
                <ModalsContainer />
                <DrawersContainer />
              </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

export default CustomApp;
