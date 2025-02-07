import { SharedApi } from '@shared/index'
import { QueryClientProvider } from '@tanstack/react-query'
import { Web3Config } from '@web3/index'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { ToasterConfig } from './configs'
import { router } from './router'

export function App() {
  return (
    <WagmiProvider config={Web3Config.wagmiConfig}>
      <QueryClientProvider client={SharedApi.queryClient}>
        <Toaster toastOptions={{ ...ToasterConfig }} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
