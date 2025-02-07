import { zodResolver } from '@hookform/resolvers/zod'
import { SharedLib, SharedUi } from '@shared/index'
import { BotService, BotTypes } from '@units/bot'
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { Web3Config, Web3Lib } from '@web3/index'
import clsx from 'clsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { CheckupList, InviteBotModal } from './ui'

type BotSettingsFormData = z.infer<typeof BotService.Schemas.botSettingsValidationSchema>

type CreateBotStatus =
  | 'Backend pending'
  | 'Backend success'
  | 'Backend error'
  | 'Approve contract pending'
  | 'Approve contract success'
  | 'Approve contract error'
  | 'Create bot pending'
  | 'Create bot success'
  | 'Create bot error'
  | 'Bot created successfully'
interface Props extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  className?: string
}

export function BotSettingsForm(props: Props) {
  const { className, ...otherProps } = props

  const [createBotStatus, setCreateBotStatus] = useState<CreateBotStatus | null>(null)

  const { mutateAsync: createBot } = BotService.Mutations.useCreateBot()
  const { address } = Web3Lib.Hooks.useWallet()

  const handleBackendStage = async (data: BotTypes.Dto.CreateBotDto) => {
    setCreateBotStatus('Backend pending')
    await createBot(data)
    toast.success('Backend bot created successfully')
    setCreateBotStatus('Backend success')
  }

  const handleApproveContract = async () => {
    setCreateBotStatus('Approve contract pending')
    const { request: approveRequest } = await simulateContract(Web3Config.wagmiConfig, {
      address: SharedLib.Constants.TOKEN_ADDRESS,
      abi: Web3Lib.Abi.tokenAbi,
      functionName: 'approve',
      args: [
        SharedLib.Constants.FACTORY_ADDRESS,
        BigInt(SharedLib.Constants.TOKEN_AMOUNT),
      ],
    })

    const approveTxHash = await writeContract(Web3Config.wagmiConfig, approveRequest)
    const { status } = await waitForTransactionReceipt(Web3Config.wagmiConfig, {
      hash: approveTxHash,
    })

    if (status !== 'success') {
      throw new Error('Approve transaction failed')
    }

    setCreateBotStatus('Approve contract success')
    toast.success('Contract approval successful')
  }

  const handleCreateBot = async (serverId: string) => {
    setCreateBotStatus('Create bot pending')
    const { request: createBotRequest } = await simulateContract(Web3Config.wagmiConfig, {
      address: SharedLib.Constants.FACTORY_ADDRESS,
      abi: Web3Lib.Abi.factoryAbi,
      functionName: 'createBot',
      args: [
        BigInt(SharedLib.Constants.TOKEN_AMOUNT),
        SharedLib.Constants.TOKEN_ADDRESS,
        serverId,
        SharedLib.Constants.AGENT_ADDRESS,
      ],
    })

    const createBotTxHash = await writeContract(Web3Config.wagmiConfig, createBotRequest)
    const { status } = await waitForTransactionReceipt(Web3Config.wagmiConfig, {
      hash: createBotTxHash,
    })

    if (status !== 'success') {
      throw new Error('Create bot transaction failed')
    }

    setCreateBotStatus('Create bot success')
    toast.success('Bot created successfully')
  }

  const onSubmit = async (data: BotTypes.Dto.CreateBotDto) => {
    if (!address) {
      toast.error('Wallet not connected')
      throw new Error('Wallet not connected')
    }

    try {
      await handleBackendStage(data)
      await SharedLib.Utils.sleep(5000)

      try {
        await handleApproveContract()
        await SharedLib.Utils.sleep(5000)

        try {
          await handleCreateBot(data.serverId)
        } catch (error) {
          setCreateBotStatus('Create bot error')
          toast.error('Failed to create bot')
          throw error
        }
      } catch (error) {
        setCreateBotStatus('Approve contract error')
        toast.error('Contract approval failed')
        throw error
      }
    } catch (error) {
      toast.error('Failed to create bot')
      throw error
    } finally {
      await SharedLib.Utils.sleep(5000)
      setCreateBotStatus(null)
    }
  }

  const { control, handleSubmit, formState, watch, reset } = useForm<BotSettingsFormData>(
    {
      resolver: zodResolver(BotService.Schemas.botSettingsValidationSchema),
      defaultValues: {
        name: '',
        description: '',
        serverId: '',
      },
      mode: 'onChange',
    },
  )

  const {
    opened: isInviteBotModalOpen,
    open: openInviteBotModal,
    close: closeInviteBotModal,
  } = SharedLib.Hooks.useDisclosure()

  const handleFormSubmit = async (data: BotSettingsFormData) => {
    await onSubmit(data)
    reset()
  }

  return (
    <form
      {...otherProps}
      className={clsx('flex gap-x-8', className)}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="grow space-y-8 rounded-3xl bg-ui p-8">
        <SharedUi.InputControl
          control={control}
          name="name"
          placeholder="Name"
          label="Project name"
          disabled={createBotStatus !== null}
        />
        <SharedUi.InputControl
          control={control}
          name="serverId"
          placeholder="Server ID"
          label="Server ID"
          disabled={createBotStatus !== null}
        />
        <SharedUi.TextAreaControl
          control={control}
          name="description"
          placeholder="Put little description of your project here"
          label="Description"
          resize="none"
          disabled={createBotStatus !== null}
        />
        <SharedUi.InputControl
          control={control}
          name="contractAddress"
          placeholder="0x0000..."
          label="Token address (optional)"
          disabled={createBotStatus !== null}
        />
        <SharedUi.Button
          className="button-gradient w-full rounded-xl px-4 py-3"
          onClick={openInviteBotModal}
          disabled={createBotStatus !== null}
        >
          Invite Bot
        </SharedUi.Button>
      </div>
      <div>
        <div className="sticky top-8 h-fit w-[26.25rem] space-y-8 rounded-3xl bg-ui p-8">
          <CheckupList watch={watch} formState={formState} />
          <SharedUi.Button
            className="button-gradient w-full rounded-xl px-4 py-3"
            type="submit"
            disabled={createBotStatus !== null}
          >
            Deploy
          </SharedUi.Button>
          {createBotStatus !== null && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50">
              <SharedUi.Loader className="mb-8 size-20" />
              <h4 className="text-lg font-medium">{createBotStatus}</h4>
            </div>
          )}
        </div>
      </div>
      <InviteBotModal isOpen={isInviteBotModalOpen} onClose={closeInviteBotModal} />
    </form>
  )
}
