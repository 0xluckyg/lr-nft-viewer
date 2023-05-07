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
  useFetchAskOrders,
} from "@/api/useFetchAskOrders";
import { getTimeFromNow } from "@/utils/timeHelper";
import { ethers } from "ethers";

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
            <React.Fragment key={order.id}>
              <HStack width="100%" justifyContent="space-between">
                <VStack alignItems="start" spacing={1}>
                  <HStack spacing={1}>
                    <Image src="/ethereum-logo.svg" boxSize="1.5em" />
                    <Text>{ethers.formatEther(order.price)}</Text>
                  </HStack>
                  <Text fontSize="sm">
                    Expiry: {getTimeFromNow(order.endTime)}
                  </Text>
                </VStack>
                <Button onClick={() => {}}>Buy</Button>
              </HStack>
              {index < askOrders.length - 1 && <Divider />}
            </React.Fragment>
          ))
        )}
      </VStack>
    </Box>
  );
}
