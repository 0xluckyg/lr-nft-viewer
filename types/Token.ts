export type TokenCard = {
  collectionAddress: string
  tokenId: string
  description?: string | null
  name?: string
  eventId?: string
  imageURI?: string | null
  tokenURI?: null
}

export type Token = {
  collectionAddress: string
  tokenId: string
  description?: string | null
  name?: string
  eventId?: string
  imageURI?: string | null
  tokenURI?: null
}

export type TokenDetail = {
  collectionAddress: string
  tokenId: string
  tokenStandard: string
}

export type Property = {
  count: number
  displayType: string
  traitType: string
  value: string
}
