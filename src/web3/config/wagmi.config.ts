import { SharedLib } from '@shared/index'
import { createConfig, http, Transport } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

const chains =
  SharedLib.Constants.NETWORK_MODE === 'mainnet'
    ? ([base] as const)
    : ([baseSepolia] as const)

const transports =
  SharedLib.Constants.NETWORK_MODE === 'mainnet'
    ? ({
        [base.id]: http(),
      } as const)
    : ({
        [baseSepolia.id]: http(),
      } as const)

export const wagmiConfig = createConfig({
  chains,
  connectors: [metaMask()],
  transports: transports as unknown as Record<number, Transport>,
})
