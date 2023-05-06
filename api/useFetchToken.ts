import { useQuery } from 'react-query'
import { looksrareClient } from './apiClients'
import { Token } from '@/types/Token'

export type FetchTokenParams = {
  collectionAddress: string
  tokenId: string
}

const QUERY_KEY = ['Token']

const fetchToken = async (params: FetchTokenParams): Promise<Token> => {
  const { collectionAddress, tokenId } = params
  const { data } = await looksrareClient.get(
    `v1/tokens?collection=${collectionAddress}&tokenId=${tokenId}`,
  )

  return data.data
}

export const useFetchToken = (params: FetchTokenParams) => {
  return useQuery<Token, Error>(
    params.collectionAddress &&
      params.tokenId && [...QUERY_KEY, ...Object.values(params)],
    () => fetchToken(params),
  )
}
