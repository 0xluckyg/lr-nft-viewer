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
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import Button from "@/components/ui/Buttons";
import { NavBar } from "../../layout/NavBar";
import { Path } from "@/utils/urlHelper";
import Orders from "./Orders";
import TokenDetail from "./TokenDetail";
import Properties from "./Properties";
import { FetchTokenParams, useFetchToken } from "@/api/useFetchToken";
import DisplayOwnership from "./DisplayOwnership";

export default function TokenPage() {
  const { collectionAddress, tokenId } = Path.getAll();
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    data: token,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useFetchToken({
    collectionAddress,
    tokenId,
  } as FetchTokenParams);

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
                <Skeleton isLoaded={imageLoaded}>
                  <Image
                    src={token?.imageURI || ""}
                    alt={token?.name}
                    objectFit="cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                </Skeleton>
              </AspectRatio>
            </Box>
            <Properties />
            <TokenDetail />
          </GridItem>

          <GridItem>
            <Flex direction="column" height="100%" gap={30} p={6}>
              <VStack alignItems="start" spacing={1}>
                <SkeletonText
                  skeletonHeight={8}
                  isLoaded={!isTokenLoading && !isTokenError}
                  noOfLines={1}
                >
                  <Text fontSize="3xl" fontWeight="bold">
                    {token?.name}
                  </Text>
                </SkeletonText>
                <SkeletonText
                  skeletonHeight={5}
                  isLoaded={!isTokenLoading && !isTokenError}
                  noOfLines={1}
                >
                  <Text>{token?.description}</Text>
                </SkeletonText>
                <SkeletonText
                  skeletonHeight={5}
                  isLoaded={!isTokenLoading && !isTokenError}
                  noOfLines={1}
                >
                  <Text>{collectionAddress}</Text>{" "}
                </SkeletonText>
                <SkeletonText
                  skeletonHeight={5}
                  isLoaded={!isTokenLoading && !isTokenError}
                  noOfLines={1}
                >
                  <Text>TokenId: {tokenId}</Text>{" "}
                </SkeletonText>
              </VStack>
              <DisplayOwnership />
              <Orders />
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
