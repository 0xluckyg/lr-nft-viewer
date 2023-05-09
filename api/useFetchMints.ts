import { TokenCard } from '@/types/Token'
import { looksrareClient } from './apiClients'
import { useInfiniteQuery } from 'react-query'

export type FetchMintsParams = {
  collectionAddress: string
  eventId: string
}

const QUERY_KEY = ['OrderListings']
const limit = 30

const fetchMints = async (
  params: FetchMintsParams,
): Promise<Array<TokenCard>> => {
  const { collectionAddress, eventId } = params
  const { data } = await looksrareClient.get(
    `v1/events?collection=${collectionAddress}&type=MINT&pagination[first]=${limit}&pagination[cursor]=${eventId}`,
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

export const useFetchMints = (params: { collectionAddress: string }) => {
  return useInfiniteQuery<Array<TokenCard>, Error>(
    params.collectionAddress && [...QUERY_KEY, ...Object.values(params)],
    ({ pageParam = '' }) => fetchMints({ ...params, eventId: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage[lastPage.length - 1]?.eventId || ''
      },
    },
  )
}
