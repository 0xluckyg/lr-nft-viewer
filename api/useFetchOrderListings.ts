import { useInfiniteQuery, useQuery } from 'react-query'
import { looksrareClient } from './apiClients'
import { TokenCard } from '@/types/Token'

export type FetchOrderListingsParams = {
  collectionAddress: string
  eventId: string
}

const QUERY_KEY = ['OrderListings']
const limit = 100

const fetchOrderListings = async (
  params: FetchOrderListingsParams,
): Promise<Array<TokenCard>> => {
  console.log('FETCH: ', params)
  const { collectionAddress, eventId } = params
  const { data } = await looksrareClient.get(
    `v2/events?collection=${collectionAddress}&type=LIST&pagination%5Bfirst%5D=${limit}&pagination%5Bcursor%5D=${eventId}`,
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

export const useFetchOrderListings = (params: {
  collectionAddress: string
}) => {
  return useInfiniteQuery<Array<TokenCard>, Error>(
    params.collectionAddress && [...QUERY_KEY, ...Object.values(params)],
    ({ pageParam = '' }) =>
      fetchOrderListings({ ...params, eventId: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage[lastPage.length - 1]?.eventId || ''
      },
    },
  )
}
