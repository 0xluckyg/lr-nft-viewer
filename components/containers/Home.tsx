import Head from "next/head";
import chakraTheme from "@chakra-ui/theme";
import { NavBar } from "@/components/layout/NavBar";

const { Button } = chakraTheme.components;

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
