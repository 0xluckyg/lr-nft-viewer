import { ExternalProvider } from '@ethersproject/providers'

import { Chain } from '@/constants/chains'

import { Web3Provider } from '@ethersproject/providers'

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
    if (switchError.code == 4902) {
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
