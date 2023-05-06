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

type NFT = {
  id: string;
  tokenId: number;
  name: string;
  description: string;
  image: string;
  price: number;
  owner: string;
};

const nfts: NFT[] = [];

for (let i = 0; i < 20; i++) {
  const nft: NFT = {
    id: i.toString(),
    tokenId: i,
    name: `NFT ${i}`,
    description: "This is a cool NFT",
    image: `https://picsum.photos/seed/${i}/200/300`,
    price: Math.floor(Math.random() * 10) + 1,
    owner: "0x1234...5678",
  };

  nfts.push(nft);
}

export default function Collection() {
  const { push } = useRouter();
  const { collectionAddress } = Path.getAll();

  function goToToken(tokenId: number) {
    push(`/${collectionAddress}/${tokenId}`);
  }

  return (
    <>
      <NavBar />
      <Container maxW="container.xl" py={12}>
        <Heading mb={8}>NFT Collection</Heading>
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8}>
          {nfts.map((nft) => (
            <Box
              bg="white"
              borderRadius="md"
              boxShadow="md"
              overflow="hidden"
              key={nft.id}
              transition="transform 200ms ease"
              cursor="pointer"
              onClick={() => goToToken(nft.tokenId)}
              _hover={{
                transform: "translateY(-10px)",
              }}
            >
              <Image
                src={nft.image}
                alt={nft.name}
                objectFit="cover"
                w="100%"
                h="200px"
              />
              <Box p={4}>
                <Heading size="md" mb={2}>
                  {nft.name}
                </Heading>
                <Text fontSize="sm" mb={4}>
                  {nft.description}
                </Text>
                <Button as={Link} onClick={() => goToToken(nft.tokenId)}>
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
