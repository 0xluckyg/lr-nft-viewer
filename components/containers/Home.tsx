import Head from "next/head";
import chakraTheme from "@chakra-ui/theme";
import { NavBar } from "@/components/layout/NavBar";

// 0xED5AF388653567Af2F388E6224dC7C4b3241C544/1562 Good example

export default function Home() {
  return (
    <>
      <Head>
        <title>Looksrare Dev Test by Scott</title>
        <meta name="description" content="Take home project for looksrare" />
      </Head>
      <NavBar />
    </>
  );
}
