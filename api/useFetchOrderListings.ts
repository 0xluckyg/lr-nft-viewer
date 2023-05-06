import { useQuery } from 'react-query'
import { looksrareClient } from './apiClients'
import { TokenCard } from '@/types/Token'

export type FetchOrderListingsParams = {
  cursor: string
  collectionAddress: string
}

const QUERY_KEY = ['OrderListings']
const limit = 30

const fetchOrderListings = async (
  params: FetchOrderListingsParams,
): Promise<Array<TokenCard>> => {
  const { cursor, collectionAddress } = params
  const { data } = await looksrareClient.get(
    `v2/events?collection=${collectionAddress}&type=LIST&pagination%5Bfirst%5D=${limit}&pagination%5Bcursor%5D=${cursor}`,
  )
  const tokens = data.data.map(
    (orderListing: { id: string; token: TokenCard }) => {
      const {
        collectionAddress,
        description,
        name,
        imageURI,
        tokenId,
        tokenURI,
      } = orderListing.token
      return {
        collectionAddress,
        description,
        name,
        imageURI,
        tokenId,
        tokenURI,
        eventId: orderListing.id,
      }
    },
  )

  return tokens
}

export const useFetchOrderListings = (params: FetchOrderListingsParams) => {
  return useQuery<Array<TokenCard>, Error>(
    params.collectionAddress && [...QUERY_KEY, ...Object.values(params)],
    () => fetchOrderListings(params),
  )
}
