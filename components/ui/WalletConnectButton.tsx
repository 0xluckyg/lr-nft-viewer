import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";

import { switchToDefaultChain, shortenAddress } from "@/utils/web3Helper";

import { useWalletConnectorDialog } from "./WalletConnectorModal";
import Button from "@/components/ui/Buttons";

interface Props {
  style?: Object;
  callback?: () => void;
}

function WalletConnectButton({ style, callback }: Props) {
  const { account, active, error } = useWeb3React();

  const connectWallet = useWalletConnectorDialog();

  if (active) {
    return (
      <Button
        style={style}
        onClick={() => {
          connectWallet();
          callback ? callback() : null;
        }}
      >
        {shortenAddress(account)}
      </Button>
    );
  }

  if (error instanceof UnsupportedChainIdError) {
    return (
      <Button
        style={style}
        onClick={() => {
          switchToDefaultChain();
          callback ? callback() : null;
        }}
      >
        Switch Chain
      </Button>
    );
  }

  return (
    <Button
      style={style}
      onClick={() => {
        connectWallet();
        callback ? callback() : null;
      }}
    >
      Connect Wallet
    </Button>
  );
}

export default WalletConnectButton;
