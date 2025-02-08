import { SharedLib } from '@shared/index'
import { BotService, BotTypes } from '@units/bot'
import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { Web3Config, Web3Lib } from '@web3/index'
import { useState } from 'react'
import toast from 'react-hot-toast'

export type CreateBotStatus =
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

export const useBotCreation = () => {
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

  const createBotFlow = async (data: BotTypes.Dto.CreateBotDto) => {
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

  return {
    createBotStatus,
    createBotFlow,
  }
}
