import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Link,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Button from "@/components/ui/Buttons";
import { NavBar } from "../layout/NavBar";
import { useRouter } from "next/router";
import { Path } from "@/utils/urlHelper";
import {
  useFetchOrderListings,
  FetchOrderListingsParams,
} from "@/api/useFetchOrderListings";
import { useState } from "react";
import { Token } from "@/types/Token";

export default function Collection() {
  const { collectionAddress } = Path.getAll();
  const [cursor, setCursor] = useState("");

  const {
    data: tokens,
    isLoading: isTokensLoading,
    isError: isTokensError,
  } = useFetchOrderListings({
    collectionAddress,
    cursor: "",
  } as FetchOrderListingsParams);

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" py={12}>
        <Heading mb={8}>NFT Collection</Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8}>
          {isTokensLoading || isTokensError
            ? Array(12)
                .fill(0)
                .map((_, index) => <TokenBoxSkeleton key={index} />)
            : tokens &&
              tokens.map((token) => {
                return <TokenBox token={token} />;
              })}
        </Grid>
      </Container>
    </>
  );
}

function TokenBox({ token }: { token: Token }) {
  const { push } = useRouter();

  function goToToken(collectionAddress: string, tokenId: string) {
    push(`/${collectionAddress}/${tokenId}`);
  }

  const [imageLoaded, setImageLoaded] = useState(false);
  const { collectionAddress, description, tokenId, eventId, name, imageURI } =
    token;
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

function TokenBoxSkeleton() {
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
