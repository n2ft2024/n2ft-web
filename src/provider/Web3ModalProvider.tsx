import { MATCHTEST_Chain, MATCH_Chain, BSC_Chain } from '@/Contract/chains'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { arbitrum, bsc, bscTestnet, optimism } from 'viem/chains'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { createPublicClient, http } from 'viem'

const projectId = '5bad4b7459c1bdcb4d4972a1227b03c2'

const chains = [bsc]
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'N2FT',
    description: 'N2FT',
    url: 'https://n2ft.com',
    icons: ['']
  }
})

export const publicClient = createPublicClient({
  chain: bsc,
  transport: http(),
})


// const { chains, publicClient,webSocketPublicClient } = configureChains(
//   [MATCH_Chain],
//   [publicProvider()],
// )
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   publicClient,
//   webSocketPublicClient,
//   connectors:[
//     new WalletConnectConnector({options:{projectId,showQrModal:false}}),
//     new InjectedConnector({ options: { shimDisconnect: true,name:'abc' } }),
//     new CoinbaseWalletConnector({ options: { appName: 'Wallets' } })
//   ]
// })

const connectorImages ={
  // coinbaseWallet: '/images/twitter.png',
  // browserWallet:'/images/twitter.png',
  // injected:'/images/star_2.png',
}

const customWallets = [
  {
    id: 'OKX',
    name: 'OKX Wallet',
    homepage: 'www.mycustomwallet.com', // Optional
    image_url: '/images/star_2.png', // Optional
    mobile_link: 'mobile_link', // Optional - Deeplink or universal
    desktop_link: 'desktop_link', // Optional - Deeplink
    webapp_link: 'webapp_link', // Optional
    app_store: 'app_store', // Optional
    play_store: 'play_store', // Optional
    injected: [
      {
        namespace: 'eip1193',
        injected_id: 'okexchain'
      }
    ]
  },
  {
    id: 'TokenPocket',
    name: 'TokenPocket',
    homepage: 'www.mycustomwallet.com', // Optional
    image_url: '/images/star_2.png', // Optional
    mobile_link: 'mobile_link', // Optional - Deeplink or universal
    desktop_link: 'desktop_link', // Optional - Deeplink
    webapp_link: 'webapp_link', // Optional
    app_store: 'app_store', // Optional
    play_store: 'play_store', // Optional
    injected: [
      {
        namespace: 'eip155',
        injected_id: 'isTokenPocket'
      }
    ]
  },
  {
    id: 'TrustWallet',
    name: 'TrustWallet',
    homepage: 'www.mycustomwallet.com', // Optional
    image_url: '/images/star_2.png', // Optional
    mobile_link: 'mobile_link', // Optional - Deeplink or universal
    desktop_link: 'desktop_link', // Optional - Deeplink
    webapp_link: 'webapp_link', // Optional
    app_store: 'app_store', // Optional
    play_store: 'play_store', // Optional
    injected: [
      {
        namespace: 'eip155',
        injected_id: 'isTrustWallet'
      }
    ]
  }
]

const featuredWalletIds:any = [
  "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66",// tp
  "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",// okx
  "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // bitget
  "ad2eff108bf828a39e5cb41331d95861c9cc516aede9cb6a95d75d98c206e204", // gate

]

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  featuredWalletIds:featuredWalletIds,
  // themeMode: 'light',
  // themeVariables: {
  //   '--w3m-color-mix': '#ECB91A',
  //   '--w3m-color-mix-strength': 20
  // }
})

export default function Web3ModalProvider({ children }:any){
  return <WagmiConfig config={wagmiConfig}>
    {children}
  </WagmiConfig>
}