import { SharedLib } from '@shared/index'
import { Web3Lib } from '@web3/index'
import { Layout } from '@widgets/layout'
import { ConnectWalletModal } from '@widgets/modals'
import { Banner, BotsSection } from './ui'

export function HomePage() {
  const { opened, open, close } = SharedLib.Hooks.useDisclosure()
  const { isConnected, disconnectAndSignOut } = Web3Lib.Hooks.useWallet()
  return (
    <>
      <ConnectWalletModal opened={opened} onClose={close} />
      <Layout className="px-16 py-8">
        <Layout.Header
          connect={open}
          disconnect={disconnectAndSignOut}
          isConnected={isConnected}
        />
        <Layout.Main>
          <Banner className="mt-8" />
          <BotsSection className="mt-12" />
        </Layout.Main>
        <Layout.Footer />
      </Layout>
    </>
  )
}
