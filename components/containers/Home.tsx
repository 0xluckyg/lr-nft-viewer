import { Container, HStack, Heading, Text, VStack } from "@chakra-ui/react";

import Button from "@/components/ui/Buttons";
import { CheckIcon } from "@chakra-ui/icons";
import React from "react";
import { defaultCollectionAddress } from "@/constants/defaultCollectionAddress";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

function Home(): JSX.Element {
  const { push } = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container maxW="container.md" my={10}>
        <VStack gap={5}>
          <VStack>
            <TaskTitle>Go to assignment:</TaskTitle>
            <Button onClick={() => push(`/${defaultCollectionAddress}`)}>
              Take me!
            </Button>
          </VStack>

          <VStack align="left">
            <TaskTitle>Requirements:</TaskTitle>
            <Task>Fetch data from our API.</Task>
            <Task>Display the NFT's name, description, tokenId and image.</Task>
            <Task>
              Have a button for the user to connect their wallet (supporting one
              connector is fine i.e. Metamask)
            </Task>
            <Task>
              Check whether the connected wallet owns the NFT, and give the user
              a visual indication of whether the owner check is truthy or falsy.
            </Task>
          </VStack>

          <VStack align="left">
            <TaskTitle>Bonus Points:</TaskTitle>
            <Task>
              We use Ethers JS, Next JS, ReactQuery, Chakra UI - all of which
              can be used in this exercise. The more of these you use, the
              better.
            </Task>
            <Task>
              Populate the query collection address and tokenId using url
              params.
            </Task>
            <Task>
              Fetch and display more information than we've given you above.
            </Task>
            <Task>
              Incoporate navigating to other NFTs within the same collection.
            </Task>
          </VStack>

          <VStack align="left">
            <TaskTitle>Stretch Goal:</TaskTitle>
            <Task>Display LooksRare ask orders</Task>
            <Task>
              Fetch valid LooksRare ask orders and add button to execute orders
              where the user has sufficient ETH, using the V2 SDK V2
            </Task>
          </VStack>

          <VStack align="left">
            <TaskTitle>Notes:</TaskTitle>
            <Task>
              You have 5 days from receipt of the test to complete it.
            </Task>
            <Task>
              Pick whichever NFT/collection you want for this exercise.
            </Task>
            <Task>
              Styling is not the most important aspect of this test, but please
              consider the page's UX.
            </Task>
            <Task>We strongly encourage Typescript</Task>
          </VStack>
        </VStack>
      </Container>
    </motion.div>
  );
}

function Task({ children }: { children: React.ReactNode }) {
  return (
    <HStack gap={4}>
      <CheckIcon fontSize="xl" color="green.500" />
      <Text fontSize="xl">{children}</Text>
    </HStack>
  );
}

function TaskTitle({ children }: { children: React.ReactNode }) {
  return (
    <Heading as="h3" fontSize="xl" textAlign="left" my={2}>
      {children}
    </Heading>
  );
}

export default Home;
