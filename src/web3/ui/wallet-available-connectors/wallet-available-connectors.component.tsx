import { SharedUi } from '@shared/index'
import { getConnectors } from '@wagmi/core'
import { Web3Config } from '@web3/index'
import { Connector } from 'wagmi'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  handleConnect?: (connector: Connector) => void
}

export function WalletAvailableConnectors(props: Props) {
  const { handleConnect, ...otherProps } = props

  const connectors = getConnectors(Web3Config.wagmiConfig)
  return (
    <div {...otherProps}>
    <div className="flex flex-col gap-4">
        {connectors.map((connector: Connector) => (
          <SharedUi.Button
            key={connector.uid}
            onClick={() => handleConnect?.(connector)}
            className="w-full rounded-xl border border-brand bg-[#1d1d1d] px-4 py-3 transition-colors hover:bg-brand/20 active:bg-brand"
          >
            <div className="flex items-center justify-center gap-3">
              <img
                src={
                  // Костыль, тк у метамаска по дефолту нет иконки :(
                  connector.name === 'MetaMask' ? '/assets/mm-logo.svg' : connector.icon
                }
                className="size-6"
                alt="icon"
              />

              <span className="truncate text-white">{connector.name}</span>
            </div>
          </SharedUi.Button>
        ))}
      </div>
    </div>
  )
}
