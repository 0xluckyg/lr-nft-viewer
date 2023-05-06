import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Link,
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

export default function Collection() {
  const { push } = useRouter();
  const { collectionAddress } = Path.getAll();
  const {
    data: tokens,
    isLoading: isTokensLoading,
    isError: isTokensError,
  } = useFetchOrderListings({
    collectionAddress,
    pageId: 1,
  } as FetchOrderListingsParams);

  function goToToken(tokenId: string) {
    push(`/${collectionAddress}/${tokenId}`);
  }

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" py={12}>
        <Heading mb={8}>NFT Collection</Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8}>
          {tokens &&
            tokens.map((token) => (
              <Box
                bg="white"
                borderRadius="md"
                boxShadow="md"
                overflow="hidden"
                key={token.id}
                transition="transform 200ms ease"
                cursor="pointer"
                onClick={() => goToToken(token.tokenId)}
                _hover={{
                  transform: "translateY(-10px)",
                }}
              >
                <Image
                  src={token.imageURI || ""}
                  alt={token.name}
                  objectFit="cover"
                  w="100%"
                  h="200px"
                />
                <Box p={4}>
                  <Heading size="md" mb={2}>
                    {token.name}
                  </Heading>
                  <Text fontSize="sm" mb={4}>
                    {token.description}
                  </Text>
                  <Button as={Link} onClick={() => goToToken(token.tokenId)}>
                    View NFT Detail
                  </Button>
                </Box>
              </Box>
            ))}
        </Grid>
      </Container>
    </>
  );
}
