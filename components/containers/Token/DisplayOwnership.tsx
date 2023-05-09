import { Box, HStack, Spacer, Text } from "@chakra-ui/react";
import {
  FetchERC721OwnerParams,
  useFetchERC721Owner,
} from "@/api/useFetchERC721Owner";

import CardInfoText from "@/components/ui/CardInfoText";
import { Path } from "@/utils/urlHelper";
import React from "react";
import WalletConnectButton from "@/components/ui/WalletConnectButton";
import { shortenAddress } from "@/utils/web3Helper";
import { useWeb3React } from "@web3-react/core";

export default function DisplayOwnership() {
  const { collectionAddress, tokenId } = Path.getAll();
  const { active, account } = useWeb3React();

  const {
    data: erc721Owner,
    isLoading: isERC721OwnerLoading,
    isError: isERC721OwnerError,
  } = useFetchERC721Owner({
    collectionAddress,
    tokenId,
  } as FetchERC721OwnerParams);

  const isOwner =
    account &&
    erc721Owner &&
    account?.toLowerCase() === erc721Owner?.toLowerCase();
  const shortenedAccount = shortenAddress(account);
  const shortenedOwner = shortenAddress(erc721Owner);

  return (
    <Box bgColor="white" boxShadow="xl" borderRadius="lg" mt={4} p={6}>
      <HStack display="flex" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold" mr={4}>
          {!active
            ? "Connect your wallet!"
            : isOwner
            ? "You own this NFT!"
            : "You don't own this NFT"}
        </Text>
        {!active && <WalletConnectButton />}
      </HStack>
      <Spacer h={3} />
      <CardInfoText
        label="My Address"
        value={shortenedAccount ? shortenedAccount : "--"}
        isLoading={isERC721OwnerLoading}
      />
      <CardInfoText
        label="Owner"
        value={!isERC721OwnerError && shortenedOwner ? shortenedOwner : "--"}
        isLoading={isERC721OwnerLoading}
      />
    </Box>
  );
}
