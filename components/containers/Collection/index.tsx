import { Container, Grid, Heading } from "@chakra-ui/react";
import { NavBar } from "../../layout/NavBar";
import { Path } from "@/utils/urlHelper";
import { useFetchMints, FetchMintsParams } from "@/api/useFetchMints";
import TokenBoxSkeleton from "./TokenBoxSkeleton";
import TokenBox from "./TokenBox";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Collection() {
  const { collectionAddress } = Path.getAll();

  const {
    data: tokenPages,
    isLoading: tokensIsLoading,
    fetchNextPage: fetchNextTokens,
    isFetchingNextPage: isFetchingNextTokens,
    isError: isTokensError,
    hasNextPage,
  } = useFetchMints({
    collectionAddress,
  } as FetchMintsParams);

  const tokens = tokenPages?.pages?.flatMap((token) => {
    return token;
  });

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" py={12}>
        <Heading mb={8}>NFT Collection</Heading>

        <InfiniteScroll
          dataLength={tokens?.length || 0}
          next={fetchNextTokens}
          hasMore={!!hasNextPage}
          loader={<></>}
          endMessage={<></>}
        >
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8}>
            {tokensIsLoading || isFetchingNextTokens || isTokensError
              ? Array(12)
                  .fill(0)
                  .map((_, index) => <TokenBoxSkeleton key={index} />)
              : tokens &&
                tokens.map((token, i) => {
                  return <TokenBox key={token.tokenId + i} token={token} />;
                })}
          </Grid>
        </InfiniteScroll>
      </Container>
    </>
  );
}
