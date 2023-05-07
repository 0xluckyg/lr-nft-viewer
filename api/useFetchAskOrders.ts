const url =
  'https://api.looksrare.org/api/v2/orders?quoteType=1&collection=0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D&itemId=870&status=VALID&pagination[first]=30'

import { useQuery } from 'react-query'
import { looksrareClient } from './apiClients'
import { AskOrder } from '@/types/AskOrder'

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
): Promise<Array<AskOrder>> => {
  const { collectionAddress, tokenId } = params
  const { data } = await looksrareClient.get(
    `v2/orders?quoteType=${QUOTE_TYPE.ASK}&collection=${collectionAddress}&itemId=${tokenId}&status=${STATUS.VALID}`,
  )
  const tokens = data.data.map((orderListing: AskOrder) => {
    const {
      id,
      collection,
      currency,
      signer,
      strategyId,
      startTime,
      endTime,
      price,
      signature,
      createdAt,
      status,
    } = orderListing
    return {
      id,
      collection,
      currency,
      signer,
      strategyId,
      startTime,
      endTime,
      price,
      signature,
      createdAt,
      status,
    }
  })

  return tokens
}

export const useFetchAskOrders = (params: FetchAskOrdersParams) => {
  return useQuery<Array<AskOrder>, Error>(
    params.collectionAddress &&
      params.tokenId && [...QUERY_KEY, ...Object.values(params)],
    () => fetchAskOrders(params),
  )
}
