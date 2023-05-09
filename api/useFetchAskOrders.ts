import { Maker } from '@looksrare/sdk-v2'
import { looksrareClient } from './apiClients'
import { useQuery } from 'react-query'

type Signature = {
  signature: string
  id: string
}
export type MakerOrder = Signature & Maker

export type FetchAskOrdersParams = {
  tokenId: string
  collectionAddress: string
}

enum QUOTE_TYPE {
  BID,
  ASK,
}

enum STATUS {
  VALID = 'VALID',
  CANCELLED = 'CANCELLED',
  EXECUTED = 'EXECUTED',
  EXPIRED = 'EXPIRED',
}

const QUERY_KEY = ['AskOrders']

const fetchAskOrders = async (
  params: FetchAskOrdersParams,
): Promise<Array<MakerOrder>> => {
  const { collectionAddress, tokenId } = params
  const { data } = await looksrareClient.get(
    `v2/orders?quoteType=${QUOTE_TYPE.ASK}&collection=${collectionAddress}&itemId=${tokenId}&status=${STATUS.VALID}`,
  )

  return data.data
}

export const useFetchAskOrders = (params: FetchAskOrdersParams) => {
  return useQuery<Array<MakerOrder>, Error>(
    params.collectionAddress &&
      params.tokenId && [...QUERY_KEY, ...Object.values(params)],
    () => fetchAskOrders(params),
  )
}
