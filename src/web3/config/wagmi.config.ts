import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

const chains =
  process.env.NODE_ENV === 'production' ? ([base] as const) : ([baseSepolia] as const)

export const wagmiConfig = createConfig({
  chains,
  connectors: [metaMask()],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})
