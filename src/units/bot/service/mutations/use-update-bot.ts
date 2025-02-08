import { queryClient } from '@shared/api'
import { SharedApi, SharedLib } from '@shared/index'
import { useMutation } from '@tanstack/react-query'
import { BotApi, BotTypes } from '@units/bot'

interface UpdateBotParams {
  id: string
  payload: BotTypes.Dto.UpdateBotDto
}

export const useUpdateBot = () => {
  const botController = BotApi.BotControllerApi.getInstance(SharedApi.baseClient)
  return useMutation({
    mutationFn: (params: UpdateBotParams) =>
      botController.updateBot(params.id, params.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(SharedLib.Enums.QueryKey.Bots) ||
          query.queryKey.includes(SharedLib.Enums.QueryKey.Bot),
      })
    },
  })
}
