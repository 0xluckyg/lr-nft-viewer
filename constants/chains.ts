import { ChainId } from '@/types/ChainId'

export interface Chain {
  chainId: number
  chainName: string
  rpcUrls: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrl: string
}

export const chains: Record<number, Chain> = {
  [ChainId.MAINNET]: {
    chainId: ChainId.MAINNET,
    chainName: 'Ethereum',
    rpcUrls: [
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_ETHEREUM_INFURA_ID}`,
    ],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrl: 'https://etherscan.io',
  },
  [ChainId.LOCAL_TESTNET]: {
    chainId: ChainId.LOCAL_TESTNET,
    chainName: 'Localhost',
    rpcUrls: ['http://127.0.0.1:8545'],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrl: 'https://etherscan.io',
  },
  [ChainId.GOERLI_TESTNET]: {
    chainId: ChainId.GOERLI_TESTNET,
    chainName: 'Goerli',
    rpcUrls: [
      `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_ETHEREUM_INFURA_ID}`,
    ],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'GoerliETH',
      decimals: 18,
    },
    blockExplorerUrl: 'https://etherscan.io',
  },
}

export const getChain = (chainId: undefined | number | string) => {
  return chains[parseInt(chainId?.toString() || '1')]
}

export const isSupportedChain = (chainId: undefined | number | string) => {
  return chains[parseInt(chainId?.toString() || '1')] && true
}

export const getNetworkURI = (chainId?: number) => {
  const chainID = chainId || parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1')
  return getChain(chainID).rpcUrls[0]
}

export const DEFAULT_CHAIN_ID = parseInt(
  process.env.NEXT_PUBLIC_CHAIN_ID || '1',
)
