import { QueryClient, QueryClientProvider } from "react-query";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { ModalProvider } from "@/providers/ModalContext";
import { NavBar } from "@/components/layout/NavBar";
import { Web3Manager } from "@/providers/Web3Manager";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "@/utils/web3Helper";
import { theme } from "@/constants/style";

//React Query setup
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Looksrare Takehome</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={client}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3Manager>
              <ModalProvider>
                <NavBar />
                <Component {...pageProps} />
              </ModalProvider>
            </Web3Manager>
          </Web3ReactProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
