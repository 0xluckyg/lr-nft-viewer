import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "@/utils/web3Helper";
import chakraTheme from "@chakra-ui/theme";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Web3Manager } from "@/providers/Web3Manager";

//Chakra UI setup
const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

//React Query setup
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchInterval: false,
      refetchOnWindowFocus: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={theme}>
      <QueryClientProvider client={client}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3Manager>
            <Component {...pageProps} />;
          </Web3Manager>
        </Web3ReactProvider>
      </QueryClientProvider>
    </ChakraBaseProvider>
  );
}
