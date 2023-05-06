import { useQuery } from 'react-query'
import { looksrareClient } from './apiClients'
import { Token } from '@/types/Token'

export type FetchOrderListingsParams = {
  pageId: number
  collectionAddress: string
}

const QUERY_KEY = ['OrderListings']

const fetchOrderListings = async (
  params: FetchOrderListingsParams,
): Promise<Array<Token>> => {
  const { data } = await looksrareClient.get(
    `events?collection=${params.collectionAddress}&type=LIST`,
  )
  const tokens = data.data.map((orderListing: { token: Token }) => {
    const {
      collectionAddress,
      description,
      name,
      id,
      imageURI,
      tokenId,
      tokenURI,
    } = orderListing.token
    return {
      collectionAddress,
      description,
      name,
      id,
      imageURI,
      tokenId,
      tokenURI,
    }
  })

  return tokens
}

export const useFetchOrderListings = (params: FetchOrderListingsParams) => {
  return useQuery<Array<Token>, Error>(
    params.collectionAddress && [...QUERY_KEY, ...Object.values(params)],
    () => fetchOrderListings(params),
  )
}
