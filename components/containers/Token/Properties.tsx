import React, { useState } from "react";
import { Box, Text, VStack, HStack, Collapse } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Path } from "@/utils/urlHelper";

export default function Properties() {
  const { collectionAddress, tokenId } = Path.getAll();
  const [showProperties, setShowProperties] = useState(false);

  const handlePropertyToggle = () => {
    setShowProperties(!showProperties);
  };

  return (
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
        <Text fontWeight="bold">Ask Orders</Text>
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
  );
}
