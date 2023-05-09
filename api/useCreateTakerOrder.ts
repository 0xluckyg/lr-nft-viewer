import { ChainId, LooksRare } from '@looksrare/sdk-v2'

import { ContractReceipt } from 'ethers'
import { MakerOrder } from './useFetchAskOrders'
import { getProvider } from '@/utils/web3Helper'
import { useMutation } from 'react-query'

export type CreateTakerOrderParams<T = any> = {
  makerOrder: MakerOrder
  recipientAddress: string
  signer: T
}

const QUERY_KEY = ['CreateTakerOrder']

async function createTakerOrder(params: CreateTakerOrderParams) {
  const { makerOrder, recipientAddress, signer } = params
  const looksrare = new LooksRare(ChainId.MAINNET, getProvider(), signer)
  const takerOrder = looksrare.createTaker(makerOrder, recipientAddress)
  const { call } = looksrare.executeOrder(
    makerOrder,
    takerOrder,
    makerOrder.signature,
  )
  const tx = await call()
  const receipt = await tx.wait()
  return receipt
}

export interface MutationError extends Error {
  code: string
}

export const useCreateTakeOrder = ({
  id,
  onSuccess,
  onError,
}: {
  id: string
  onSuccess: (data: ContractReceipt) => void
  onError: (error: MutationError) => void
}) => {
  return useMutation<ContractReceipt, Error, CreateTakerOrderParams>(
    [...QUERY_KEY, id],
    createTakerOrder,
    {
      onSuccess: (data) => {
        onSuccess(data)
      },
      onError: (error) => {
        onError(error as MutationError)
      },
    },
  )
}
