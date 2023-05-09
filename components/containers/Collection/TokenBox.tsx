import { Box, Heading, Image, Link, Skeleton, Text } from "@chakra-ui/react";

import Button from "@/components/ui/Buttons";
import { TokenCard } from "@/types/Token";
import { useRouter } from "next/router";
import { useState } from "react";

export default function TokenBox({ token }: { token: TokenCard }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const { push } = useRouter();
  const { collectionAddress, description, tokenId, eventId, name, imageURI } =
    token;

  const goToToken = (collectionAddress: string, tokenId: string): void => {
    push(`/${collectionAddress}/${tokenId}`);
  };

  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="md"
      overflow="hidden"
      key={eventId}
      transition="transform 200ms ease"
      cursor="pointer"
      onClick={() => goToToken(collectionAddress, tokenId)}
      _hover={{
        transform: "translateY(-10px)",
      }}
    >
      <Skeleton isLoaded={imageLoaded} w="100%" h="200px">
        <Image
          src={imageURI || ""}
          alt={name}
          objectFit="cover"
          w="100%"
          h="200px"
          onLoad={() => setImageLoaded(true)}
        />
      </Skeleton>
      <Box p={4}>
        <Heading size="md" mb={2}>
          {name}
        </Heading>
        <Text fontSize="sm" mb={4}>
          {description}
        </Text>
        <Button as={Link} onClick={() => goToToken(collectionAddress, tokenId)}>
          View NFT Detail
        </Button>
      </Box>
    </Box>
  );
}
