import { Box, Collapse, Grid, HStack, Skeleton, Text } from "@chakra-ui/react";
import { FetchTokenParams, useFetchToken } from "@/api/useFetchToken";
import React, { useState } from "react";

import { Attribute } from "@/types/Token";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getAll } from "@/utils/urlHelper";

export default function Properties(): JSX.Element {
  const [showProperties, setShowProperties] = useState(false);
  const { collectionAddress, tokenId } = getAll();

  const {
    data: token,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useFetchToken({
    collectionAddress,
    tokenId,
  } as FetchTokenParams);

  const handlePropertyToggle = (): void => {
    setShowProperties(!showProperties);
  };

  return (
    <Box
      bgColor="white"
      boxShadow="xl"
      borderRadius="lg"
      mt={4}
      p={6}
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
        <Grid
          templateColumns="repeat(auto-fit, minmax(150px, 1fr))"
          gap={4}
          mt={4}
        >
          {isTokenLoading || isTokenError ? (
            // Show skeleton loader when properties are loading
            <Skeleton height="100px" borderRadius="md" />
          ) : !token?.attributes || !token?.attributes.length ? (
            <Text>No properties</Text>
          ) : (
            token?.attributes?.map((property: Attribute, index: number) => {
              const gradientColors = [
                "linear(to-r, pink.600, green.600)",
                "linear(to-r, green.600, blue.600)",
                "linear(to-r, purple.600, orange.600)",
                "linear(to-r, yellow.600, pink.600)",
              ];
              const bgColor = gradientColors[index % gradientColors.length];
              const { traitType, value, count } = property;

              return (
                <Box
                  key={index}
                  w="100%"
                  h="100px" // Set height to make the boxes more squared
                  p={2}
                  borderRadius="md"
                  boxShadow="md"
                  bgGradient={bgColor}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontWeight="bold" fontSize="sm" color="white">
                    {traitType}
                  </Text>
                  <Text fontSize="sm" color="white">
                    {value}
                  </Text>
                  <Text fontWeight="bold" fontSize="sm" color="white">
                    Total count: {count}
                  </Text>
                </Box>
              );
            })
          )}
        </Grid>
      </Collapse>
    </Box>
  );
}
