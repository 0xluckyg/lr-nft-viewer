import { useQuery } from 'react-query'
import { looksrareClient } from './apiClients'
import { Token } from '@/types/Token'

export type FetchTokenParams = {
  collectionAddress: string
  tokenId: string
}

const QUERY_KEY = ['Token']

async function fetchToken(params: FetchTokenParams): Promise<Token> {
  const { data } = await looksrareClient.get(
    `v1/tokens?collection=${params.collectionAddress}&tokenId=${params.tokenId}`,
  )

  const {
    collectionAddress,
    tokenId,
    description,
    name,
    imageURI,
    attributes,
  } = data.data
  const token: Token = {
    collectionAddress,
    tokenId,
    description,
    name,
    imageURI,
    attributes,
    tokenStandard: data.data.collection.type,
  }

  return token
}

export const useFetchToken = (params: FetchTokenParams) => {
  return useQuery<Token, Error>(
    params.collectionAddress &&
      params.tokenId && [...QUERY_KEY, ...Object.values(params)],
    () => fetchToken(params),
  )
}
