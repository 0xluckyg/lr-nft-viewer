import { DEFAULT_CHAIN_ID, getChain } from "@/constants/chains";
import React, { useEffect, useState } from "react";
import {
  useEagerConnect,
  useInactiveListener,
} from "@/hooks/useWalletConnector";

import { ExternalProvider } from "@ethersproject/providers";
import { switchChain } from "@/utils/web3Helper";
import { useWeb3React } from "@web3-react/core";

export function Web3Manager({ children }: { children: React.ReactNode }) {
  const { connector, active, library, chainId } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useEffect(() => {
    if (!library || !active || chainId === DEFAULT_CHAIN_ID) {
      return;
    }

    // auto switch chain if on different chain
    (async () => {
      const chainInfo = getChain(DEFAULT_CHAIN_ID);
      const provider = library.provider as ExternalProvider;
      await switchChain(provider, chainInfo.chainId, chainInfo);
    })();
  }, [library, active]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(triedEager);

  return <>{children}</>;
}
