import { chains, getChain } from '@/constants/chains'

import { InjectedConnector } from '@web3-react/injected-connector'

// Add all the supported chains.
export const injected = new InjectedConnector({
  supportedChainIds: Object.keys(chains).map((key) => getChain(key).chainId),
})
