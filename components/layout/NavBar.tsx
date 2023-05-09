import { Box, Flex, Image, Spacer, Text, useTheme } from "@chakra-ui/react";

import Link from "next/link";
import WalletConnectButton from "../ui/WalletConnectButton";
import { defaultCollectionAddress } from "@/constants/defaultCollectionAddress";
import { useRouter } from "next/router";

export function NavBar(): JSX.Element {
  const { colors } = useTheme();
  const { push } = useRouter();

  return (
    <Flex
      as="nav"
      height="76px"
      boxShadow="md"
      align="center"
      position="sticky"
      padding="0 36px"
      top="0"
      bg={colors.white}
      zIndex={1}
    >
      <Link href="/" passHref>
        <Image src="/looksrare-logo.svg" alt="LR" width="36px" height="20px" />
      </Link>
      <Box width="4px" />
      <Box display={{ base: "none", lg: "block" }}>
        <Link href="/" passHref>
          <Text
            fontWeight={700}
            fontSize="18px"
            color="black"
            letterSpacing="0.2px"
            cursor="pointer"
            _hover={{
              color: colors.primary.main,
              transition: "all 200ms ease",
            }}
          >
            Looksrare NFT Viewer Test!
          </Text>
        </Link>
      </Box>
      <Spacer flex={1} />
      <Flex
        alignItems="center"
        width="300px"
        justifyContent="space-between"
        marginRight="30px"
        left="60%"
        transition="all 500ms ease"
        cursor="pointer"
      >
        <Text
          as="span"
          onClick={() => {
            push(`/`);
          }}
        >
          Home
        </Text>
        <Text as="span" onClick={() => push(`/${defaultCollectionAddress}`)}>
          Collection
        </Text>
        <WalletConnectButton />
      </Flex>
    </Flex>
  );
}
