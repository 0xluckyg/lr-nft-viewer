import Head from "next/head";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

export default function Home() {
  return (
    <ChakraBaseProvider theme={theme}>
      <Head>
        <title>Looksrare Dev Test by Scott</title>
        <meta name="description" content="Take home project for looksrare" />
      </Head>
      <main></main>
    </ChakraBaseProvider>
  );
}
