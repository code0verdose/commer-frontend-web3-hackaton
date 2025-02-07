import { queryClient } from '@shared/api'
import { SharedApi, SharedLib } from '@shared/index'
import { useMutation } from '@tanstack/react-query'
import { BotApi, BotTypes } from '@units/bot'

export const useCreateBot = () => {
  const botController = BotApi.BotControllerApi.getInstance(SharedApi.baseClient)
  return useMutation({
    mutationFn: (data: BotTypes.Dto.CreateBotDto) => botController.createBot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SharedLib.Enums.QueryKey.Bots] })
    },
  })
}
