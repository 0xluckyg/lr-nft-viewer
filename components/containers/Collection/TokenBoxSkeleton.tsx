import { Box, Skeleton } from "@chakra-ui/react";

export default function TokenBoxSkeleton() {
  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="md"
      overflow="hidden"
      transition="transform 200ms ease"
    >
      <Skeleton w="100%" h="200px" />
      <Box p={4}>
        <Skeleton mb={2} h="1.2em" />
        <Skeleton mb={4} h="1em" />
        <Skeleton h="2em" />
      </Box>
    </Box>
  );
}
