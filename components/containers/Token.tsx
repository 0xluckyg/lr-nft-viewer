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
  Collapse,
} from "@chakra-ui/react";
import Button from "@/components/ui/Buttons";
import { NavBar } from "../layout/NavBar";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
  const [showProperties, setShowProperties] = useState(false);
  const [showTokenDetail, setShowTokenDetail] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const handlePropertyToggle = () => {
    setShowProperties(!showProperties);
  };

  const handleTokenDetailToggle = () => {
    setShowTokenDetail(!showTokenDetail);
  };

  const handleOrderDetailToggle = () => {
    setShowOrderDetail(!showOrderDetail);
  };

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
            <Box
              bgColor="white"
              boxShadow="xl"
              borderRadius="lg"
              mt={4}
              p={4}
              onClick={handlePropertyToggle}
              cursor="pointer"
            >
              <HStack spacing={4}>
                <Text fontWeight="bold">Properties</Text>
                <ChevronDownIcon
                  boxSize={6}
                  transform={showProperties ? "rotate(180deg)" : "rotate(0)"}
                  transition="transform 0.3s ease-in-out"
                />
              </HStack>
              <Collapse in={showProperties}>
                <VStack alignItems="start" mt={4} spacing={2}>
                  <Text>Property 1: Value 1</Text>
                  <Text>Property 2: Value 2</Text>
                  <Text>Property 3: Value 3</Text>
                </VStack>
              </Collapse>
            </Box>
            <Box
              bgColor="white"
              boxShadow="xl"
              borderRadius="lg"
              mt={4}
              p={4}
              onClick={handleTokenDetailToggle}
              cursor="pointer"
            >
              <HStack spacing={4}>
                <Text fontWeight="bold">Token Detail</Text>
                <ChevronDownIcon
                  boxSize={6}
                  transform={showTokenDetail ? "rotate(180deg)" : "rotate(0)"}
                  transition="transform 0.3s ease-in-out"
                />
              </HStack>
              <Collapse in={showTokenDetail}>
                <VStack alignItems="start" mt={4} spacing={2}>
                  <Text>Property 1: Value 1</Text>
                  <Text>Property 2: Value 2</Text>
                  <Text>Property 3: Value 3</Text>
                </VStack>
              </Collapse>
            </Box>
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

              <Box
                bgColor="white"
                boxShadow="xl"
                borderRadius="lg"
                mt={4}
                p={4}
                onClick={handleOrderDetailToggle}
                cursor="pointer"
              >
                <HStack spacing={4}>
                  <Text fontWeight="bold">Ask Orders</Text>
                  <ChevronDownIcon
                    boxSize={6}
                    transform={showOrderDetail ? "rotate(180deg)" : "rotate(0)"}
                    transition="transform 0.3s ease-in-out"
                  />
                </HStack>
                <Collapse in={showOrderDetail}>
                  <VStack alignItems="start" mt={4} spacing={2}>
                    <Text>Property 1: Value 1</Text>
                    <Text>Property 2: Value 2</Text>
                    <Text>Property 3: Value 3</Text>
                  </VStack>
                </Collapse>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
