import { createConfig, http } from 'wagmi'
import { baseSepolia, base } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [baseSepolia, base],
  connectors: [metaMask()],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})
