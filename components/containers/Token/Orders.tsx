import React from "react";
import {
  Box,
  Divider,
  HStack,
  Text,
  VStack,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { Path } from "@/utils/urlHelper";
import Button from "@/components/ui/Buttons";
import {
  FetchAskOrdersParams,
  MakerOrder,
  useFetchAskOrders,
} from "@/api/useFetchAskOrders";
import { getTimeFromNow } from "@/utils/timeHelper";
import { ContractReceipt, ethers } from "ethers";
import { MutationError, useCreateTakeOrder } from "@/api/useCreateTakerOrder";
import { useWeb3React } from "@web3-react/core";
import useAppToast from "@/hooks/useToast";

export default function Orders() {
  const { collectionAddress, tokenId } = Path.getAll();

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
        ) : !askOrders?.length ? (
          "No ask price"
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
}) {
  const { account, library } = useWeb3React();
  const showToast = useAppToast();

  function getErrorMessage(code: string) {
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
  }

  const { mutate, isLoading: isCreateTakerOrderLoading } = useCreateTakeOrder({
    id: order.id,
    onSuccess: (data: ContractReceipt) => {
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

  function executeOrder(): void {
    if (!account) return;
    mutate({
      makerOrder: order,
      recipientAddress: account,
      signer: library.getSigner(),
    });
  }
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
