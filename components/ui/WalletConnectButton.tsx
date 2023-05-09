import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { shortenAddress, switchToDefaultChain } from "@/utils/web3Helper";

import Button from "@/components/ui/Buttons";
import { CSSProperties } from "react";
import { useWalletConnectorDialog } from "@/hooks/useWalletConnectorDialog";

interface Props {
  style?: CSSProperties;
  callback?: () => void;
}

function WalletConnectButton({ style, callback }: Props): JSX.Element {
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
