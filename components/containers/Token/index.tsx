// pages/token.tsx
import React, { useState } from "react";
import {
  Box,
  Image,
  Flex,
  Text,
  Grid,
  GridItem,
  Container,
  VStack,
  HStack,
  AspectRatio,
} from "@chakra-ui/react";
import Button from "@/components/ui/Buttons";
import { NavBar } from "../../layout/NavBar";
import { Path } from "@/utils/urlHelper";
import Orders from "./Orders";
import TokenDetail from "./TokenDetail";
import Properties from "./Properties";
import { Token } from "@/types/Token";
import { FetchTokenParams, useFetchToken } from "@/api/useFetchToken";

export default function TokenPage() {
  const { collectionAddress, tokenId } = Path.getAll();

  const {
    data: token,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useFetchToken({
    collectionAddress,
    tokenId,
  } as FetchTokenParams);

  console.log("TT", token);

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" py={10}>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "3fr 4fr" }}
          gap={6}
        >
          <GridItem>
            <Box
              borderRadius="lg"
              boxShadow="xl"
              overflow="hidden"
              w="100%"
              maxW="1000px"
            >
              <AspectRatio ratio={1}>
                <Image
                  src={token?.imageURI || ""}
                  alt={token?.name}
                  objectFit="cover"
                />
              </AspectRatio>
            </Box>
            <Properties />
            <TokenDetail />
          </GridItem>

          <GridItem>
            <Flex direction="column" height="100%" gap={30} p={6}>
              <VStack alignItems="start" spacing={1}>
                <Text fontSize="3xl" fontWeight="bold">
                  {token?.name}
                </Text>
                {token?.description && <Text>{token?.description}</Text>}
                {collectionAddress && <Text>{collectionAddress}</Text>}
                {tokenId && <Text>TokenId: {tokenId}</Text>}
              </VStack>

              <HStack>
                <Text fontSize="2xl" fontWeight="bold" mr={4}>
                  You own this NFT!
                </Text>
                <Button>Buy Now</Button>
              </HStack>
              <Orders />
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
