import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ModalProvider } from "@/hooks/useModal";
import { NavBar } from "@/components/layout/NavBar";
import { Web3Manager } from "@/providers/Web3Manager";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "@/utils/web3Helper";

//Chakra UI setup
const theme = extendTheme({
  colors: {
    primary: {
      main: "#08CE59",
      light: "#5dfc9d",
      dark: "#039b40",
    },
    white: "#ffffff",
    black: {
      50: "#D2D3D4",
      100: "#A5A6A9",
      300: "#808191",
      500: "#11142D",
      700: "#1B1D21",
      900: "#000000",
    },
    red: "#D10000",
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
});

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
