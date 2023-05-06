import { Container, Grid, Heading } from "@chakra-ui/react";
import { NavBar } from "../../layout/NavBar";
import { Path } from "@/utils/urlHelper";
import {
  useFetchOrderListings,
  FetchOrderListingsParams,
} from "@/api/useFetchOrderListings";
import TokenBoxSkeleton from "./TokenBoxSkeleton";
import TokenBox from "./TokenBox";

export default function Collection() {
  const { collectionAddress } = Path.getAll();

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
