import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FetchTokenParams, useFetchToken } from "@/api/useFetchToken";
// pages/token.tsx
import React, { useState } from "react";

import DisplayOwnership from "./DisplayOwnership";
import Orders from "./Orders";
import Properties from "./Properties";
import TokenDetail from "./TokenDetail";
import { getAll } from "@/utils/urlHelper";

export default function TokenPage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { collectionAddress, tokenId } = getAll();

  const {
    data: token,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useFetchToken({
    collectionAddress,
    tokenId,
  } as FetchTokenParams);

  return (
    <Container maxW="container.xl" py={10}>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "3fr 4fr" }} gap={6}>
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
          <Flex direction="column" height="100%" gap={3} p={6}>
            <VStack alignItems="start">
              <SkeletonText
                skeletonHeight={8}
                minW={300}
                isLoaded={!isTokenLoading && !isTokenError}
                noOfLines={1}
              >
                <Text fontSize="3xl" fontWeight="bold">
                  {token?.name || "--"}
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
                <Text>
                  <b>Address:</b> {collectionAddress}
                </Text>{" "}
              </SkeletonText>
              <SkeletonText
                skeletonHeight={5}
                isLoaded={!isTokenLoading && !isTokenError}
                noOfLines={1}
              >
                <Text>
                  <b>TokenId:</b> {tokenId}
                </Text>{" "}
              </SkeletonText>
            </VStack>
            <DisplayOwnership />
            <Orders />
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
}
