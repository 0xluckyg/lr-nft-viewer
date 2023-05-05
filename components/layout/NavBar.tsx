import { useTheme, Box, Flex, Image, Text, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export function NavBar() {
  const { colors } = useTheme();
  const { asPath, push } = useRouter();

  return (
    <Flex
      as="nav"
      height="76px"
      boxShadow="md"
      align="center"
      position="sticky"
      padding="0 36px"
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
        width="180px"
        justifyContent="space-between"
        marginRight="30px"
        left="60%"
        transition="all 500ms ease"
        cursor="pointer"
      >
        <Text as="span" onClick={() => {}}>
          Home
        </Text>
        <Text as="span" onClick={() => {}}>
          Collection
        </Text>
      </Flex>
    </Flex>
  );
}
