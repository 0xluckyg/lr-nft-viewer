import { DEFAULT_CHAIN_ID, getChain } from '@/constants/chains'
import { getProvider } from '@/utils/web3Helper'
import { ethers } from 'ethers'
import { useQuery } from 'react-query'

export type FetchERC721OwnerParams = {
  collectionAddress: string
  tokenId: string
}

const QUERY_KEY = ['ERC721Owner']

export async function queryERC721Owner({
  collectionAddress,
  tokenId,
}: FetchERC721OwnerParams): Promise<string> {
  const ownerOfAbi = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
      ],
      name: 'ownerOf',
      outputs: [{ name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
  ]

  const collectionContract = new ethers.Contract(
    collectionAddress,
    ownerOfAbi,
    getProvider(),
  )

  try {
    const owner = await collectionContract.ownerOf(tokenId)
    return owner
  } catch (err) {
    console.log('Failed queryERC721Owner: ', err)
    return ''
  }
}

export const useFetchERC721Owner = (params: FetchERC721OwnerParams) => {
  return useQuery<string, Error>(
    params.collectionAddress &&
      params.tokenId && [...QUERY_KEY, ...Object.values(params)],
    () => queryERC721Owner(params),
  )
}
