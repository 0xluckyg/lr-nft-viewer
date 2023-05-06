// pages/nft.tsx
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

interface NFT {
  tokenId: number;
  name: string;
  imageUrl: string;
  description: string;
  price: string;
}

const nft: NFT = {
  tokenId: 1,
  name: "Sample NFT",
  imageUrl: "https://picsum.photos/seed/1/200/300",
  description: "This is a sample NFT description.",
  price: "1.5 ETH",
};

export default function NFTPage() {
  const { collectionAddress, tokenId } = Path.getAll();

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
                <Image src={nft.imageUrl} alt={nft.name} objectFit="cover" />
              </AspectRatio>
            </Box>
            <Properties />
            <TokenDetail />
          </GridItem>

          <GridItem>
            <Flex direction="column" height="100%" gap={30} p={6}>
              <VStack alignItems="start" spacing={4}>
                <Text fontSize="2xl" fontWeight="bold">
                  {nft.name}
                </Text>
                <Text>{nft.description}</Text>
              </VStack>

              <HStack>
                <Text fontSize="2xl" fontWeight="bold" mr={4}>
                  {nft.price}
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
