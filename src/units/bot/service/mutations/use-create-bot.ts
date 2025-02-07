import { queryClient } from '@shared/api'
import { SharedApi, SharedLib } from '@shared/index'
import { useMutation } from '@tanstack/react-query'
import { BotApi, BotTypes } from '@units/bot'
import toast from 'react-hot-toast'

export const useCreateBot = () => {
  const botController = BotApi.BotControllerApi.getInstance(SharedApi.baseClient)
  return useMutation({
    mutationFn: (data: BotTypes.Dto.CreateBotDto) => botController.createBot(data),
    onSuccess: () => {
      toast.success('Bot created successfully')
      queryClient.invalidateQueries({ queryKey: [SharedLib.Enums.QueryKey.Bots] })
    },
    onError: (error) => {
      toast.error(SharedLib.Utils.responseErrorParser(error) || 'Failed to create bot')
    },
  })
}
