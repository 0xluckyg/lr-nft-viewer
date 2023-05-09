import { Box, Collapse, HStack, Text, VStack } from "@chakra-ui/react";
import { FetchTokenParams, useFetchToken } from "@/api/useFetchToken";
import React, { useState } from "react";

import CardInfoText from "@/components/ui/CardInfoText";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Path } from "@/utils/urlHelper";
import { shortenAddress } from "@/utils/web3Helper";

export default function TokenDetail() {
  const { collectionAddress, tokenId } = Path.getAll();
  const [showTokenDetail, setShowTokenDetail] = useState(false);

  const {
    data: token,
    isLoading: isTokenLoading,
    isError: isTokenError,
  } = useFetchToken({
    collectionAddress,
    tokenId,
  } as FetchTokenParams);

  const handleTokenDetailToggle = () => {
    setShowTokenDetail(!showTokenDetail);
  };

  return (
    <Box
      bgColor="white"
      boxShadow="xl"
      borderRadius="lg"
      mt={4}
      p={6}
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
          <CardInfoText
            label="Collection Address"
            value={shortenAddress(token?.collectionAddress)}
            isLoading={isTokenLoading || isTokenError}
          />
          <CardInfoText
            label="Token ID"
            value={token?.tokenId}
            isLoading={isTokenLoading || isTokenError}
          />
          <CardInfoText
            label="Token Standard"
            value={token?.tokenStandard}
            isLoading={isTokenLoading || isTokenError}
          />
        </VStack>
      </Collapse>
    </Box>
  );
}
