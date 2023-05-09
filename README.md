## Getting Started

To run it on Eth Mainnet:

```bash
yarn dev
```

To run it on Goerli:

```bash
yarn dev-testnet
```

## Folder structure

    .
    ├── api
        ├── apiClient           # Generates axios client and a general request error handler
        ├── useCreateTakeOrder  # hook for handling taker order
        ├── useFetchAskOrders   # hook for gettingt the ask orders for a token
        ├── useFetchERC721Owner # hook for getting the owner for a token given a collection address and a tokenId
        ├── useFetchMints       # hook for getting the mint events for tokens in a collection to be displayed in the collection page
        ├── useFetchToken       # hook for getting the detailed information about the token
    ├── components              # All JSX files
    │   ├── containers          # Main components used by pages directory
    │       ├── Collection      # Collection page components
    │       ├── Token           # Token page components
    │       ├── Home            # Home page components
    │   ├── layout              # Components that define the layout of the app such as the navigation bar
    │   └── ui                  # Reusable components such as buttons and modals
    ├── connectors              # Contains web3-react InjectedConnector for using Metamask provider
    ├── constants               # Constant variables such as ChainIDs and style
    ├── hooks                   # Reusable hooks
    ├── providers               # Providers that wrap the whole or some parts of the application
    ├── pages                   # App directories
    │   ├── Collection          # Collection page
    │   ├── Token               # Token page
    │   ├── Home                # Home page
    ├── public                  # Static public files
    ├── types                   # Reusable types and interfaces
    ├── utils                   # Reusable helper functions