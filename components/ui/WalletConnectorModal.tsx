import { useCallback } from "react";
import { useTheme } from "@chakra-ui/react";
import { useModal } from "@/hooks/useModal";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "@/connectors/connectors";
import { isSupportedChain } from "@/constants/chains";
import { switchToDefaultChain } from "@/utils/web3Helper";
import { Image, Box, Text, VStack } from "@chakra-ui/react";
import Button, { TextButton } from "@/components/ui/Buttons";

export function useWalletConnectorDialog() {
  const { open, close } = useModal();
  return useCallback(() => {
    open(<WalletConnectorModal onClose={close} />);
  }, [open, close]);
}

function WalletConnectorModal({ onClose }: { onClose: () => void }) {
  const { colors } = useTheme();
  const { activate, deactivate, active, account, chainId, error } =
    useWeb3React();

  const isChainValid = active
    ? isSupportedChain(chainId)
    : error instanceof UnsupportedChainIdError
    ? false
    : true;

  return (
    <Box
      maxW="400px"
      w="70vw"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap="20px"
    >
      <VStack align="center" w="100%" spacing="3px">
        <Image
          src="/metamask-logo.svg"
          alt="Logo"
          width="100px"
          height="100px"
        />

        <Text fontWeight={600} fontSize={17} color={colors.black[300]}>
          {!isChainValid
            ? "Please switch to a supported chain."
            : !active
            ? "Connect with one of your metamask wallets."
            : "Disconnect from wallet."}
        </Text>
      </VStack>
      <VStack align="center" w="100%" spacing="10px">
        <Button
          onClick={async () => {
            if (!isChainValid) {
              await switchToDefaultChain();
            } else if (!active) {
              await activate(injected);
            } else {
              deactivate();
            }
            onClose();
          }}
        >
          {!isChainValid ? "Switch Chain" : !active ? "Connect" : "Disconnect"}
        </Button>
        <TextButton variant="link">Learn More</TextButton>
      </VStack>
    </Box>
  );
}
