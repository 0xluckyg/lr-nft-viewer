import {
  Box,
  Divider,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FetchAskOrdersParams,
  MakerOrder,
  useFetchAskOrders,
} from "@/api/useFetchAskOrders";
import { MutationError, useCreateTakeOrder } from "@/api/useCreateTakerOrder";

import Button from "@/components/ui/Buttons";
import React from "react";
import { ethers } from "ethers";
import { getAll } from "@/utils/urlHelper";
import { getTimeFromNow } from "@/utils/timeHelper";
import useAppToast from "@/hooks/useToast";
import { useWeb3React } from "@web3-react/core";

export default function Orders(): JSX.Element {
  const { collectionAddress, tokenId } = getAll();

  const {
    data: askOrders,
    isLoading: isAskOrdersLoading,
    isError: isAskOrdersError,
  } = useFetchAskOrders({
    collectionAddress,
    tokenId,
  } as FetchAskOrdersParams);

  const LoadingSkeleton = () => <Skeleton height="20px" width="100%" my={2} />;
  return (
    <Box bgColor="white" boxShadow="xl" borderRadius="lg" mt={4} p={6}>
      <Text fontWeight="bold">Ask Orders</Text>
      <VStack alignItems="start" mt={4} spacing={2}>
        {isAskOrdersError ? (
          <Text>Couldn't fetch the orders. Please come back later</Text>
        ) : isAskOrdersLoading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : askOrders?.length === 0 ? (
          <Text>No ask price</Text>
        ) : (
          askOrders?.map((order, index) => (
            <Order order={order} hasDivider={index < askOrders.length - 1} />
          ))
        )}
      </VStack>
    </Box>
  );
}

// to test with cheap NFTs on mainnet,
// use 0x7fAd74fe7Aae8980165B3cb1a00a794ddF2B3C49/532

enum TakerOrderErrorCodeTypes {
  ACTION_REJECTED = "ACTION_REJECTED",
  INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS",
}

function Order({
  order,
  hasDivider,
}: {
  order: MakerOrder;
  hasDivider: boolean;
}): JSX.Element {
  const { account, library } = useWeb3React();
  const showToast = useAppToast();

  const { mutate, isLoading: isCreateTakerOrderLoading } = useCreateTakeOrder({
    id: order.id,
    onSuccess: () => {
      showToast({
        colorScheme: "cyan",
        title: "Successful",
        description: "Trade success!",
        status: "error",
      });
    },
    onError: (error: MutationError) => {
      showToast({
        colorScheme: "pink",
        title: "Error",
        description: getErrorMessage(error.code),
        status: "error",
      });
    },
  });

  const executeOrder = (): void => {
    if (!account) return;
    mutate({
      makerOrder: order,
      recipientAddress: account,
      signer: library.getSigner(),
    });
  };

  const getErrorMessage = (code: string) => {
    switch (code) {
      case TakerOrderErrorCodeTypes.ACTION_REJECTED: {
        return "Buy cancelled";
      }
      case TakerOrderErrorCodeTypes.INSUFFICIENT_FUNDS: {
        return "Your size is not size";
      }
      default: {
        return "Please try again later";
      }
    }
  };

  return (
    <React.Fragment key={order.id}>
      <HStack width="100%" justifyContent="space-between">
        <VStack alignItems="start" spacing={1}>
          <HStack spacing={1}>
            <Image src="/ethereum-logo.svg" boxSize="1.5em" />
            <Text>{ethers.utils.formatEther(order.price)}</Text>
          </HStack>
          <Text fontSize="sm">
            Expiry: {getTimeFromNow(Number(order.endTime))}
          </Text>
        </VStack>
        {account && (
          <Button isLoading={isCreateTakerOrderLoading} onClick={executeOrder}>
            Buy
          </Button>
        )}
      </HStack>
      {hasDivider && <Divider />}
    </React.Fragment>
  );
}
