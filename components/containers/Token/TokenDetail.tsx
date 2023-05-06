import React, { useState } from "react";
import { Box, Text, VStack, HStack, Collapse } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Path } from "@/utils/urlHelper";

export default function TokenDetail() {
  const { collectionAddress, tokenId } = Path.getAll();
  const [showTokenDetail, setShowTokenDetail] = useState(false);

  const handleTokenDetailToggle = () => {
    setShowTokenDetail(!showTokenDetail);
  };

  return (
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
  );
}
