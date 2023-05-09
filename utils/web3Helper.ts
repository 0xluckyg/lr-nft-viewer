import {
  Chain,
  DEFAULT_CHAIN_ID,
  getChain,
  getNetworkURI,
} from '@/constants/chains'
import {
  ExternalProvider,
  StaticJsonRpcProvider,
} from '@ethersproject/providers'

import { Web3Provider } from '@ethersproject/providers'
import { getAddress } from '@ethersproject/address'
import { isClient } from '@/utils/envHelper'

const defaultChain = getChain(DEFAULT_CHAIN_ID)

interface CustomError extends Error {
  code: number
}

interface CustomWindow extends Window {
  ethereum?: {
    request: (args: any) => Promise<any>
  }
}

// Use customWindow in place of window if in browser environment
const customWindow: CustomWindow = isClient()
  ? window
  : ((null as unknown) as CustomWindow)

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : 'any',
  )

  return library
}

export async function switchToDefaultChain() {
  try {
    const formattedChainId = `0x${defaultChain.chainId.toString(16)}`
    await customWindow.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: formattedChainId }],
    })
  } catch (error) {
    if (
      (error as CustomError).code === 4902 ||
      (error as CustomError).code === -32603
    ) {
      await addChain()
    }
  }
}

export async function switchChain(
  provider: ExternalProvider,
  chainId: number,
  chainInfo: Chain,
) {
  const formattedChainId = `0x${chainId.toString(16)}`
  try {
    if (provider) {
      await provider.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: formattedChainId }],
      })
    }
  } catch (switchError) {
    if ((switchError as CustomError).code == 4902) {
      try {
        await provider.request?.({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: formattedChainId,
              chainName: chainInfo.chainName,
              rpcUrls: chainInfo.rpcUrls,
              nativeCurrency: chainInfo.nativeCurrency,
              blockExplorerUrl: chainInfo.blockExplorerUrl,
            },
          ],
        })
      } catch (addError) {}
    }
  }
}

async function addChain() {
  try {
    await customWindow.ethereum?.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          ...defaultChain,
        },
      ],
    })
  } catch (addError) {
    console.error(addError)
  }
}

export function shortenAddress(
  address: string | null | undefined,
  chars = 4,
): string {
  try {
    if (!address) return ''
    const parsed = getAddress(address)
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
  } catch (error) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
}

export function getProvider(chainId?: number) {
  const chainID = chainId || defaultChain.chainId
  return new StaticJsonRpcProvider(getNetworkURI(chainID))
}
