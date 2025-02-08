import { queryClient } from '@shared/api'
import { SharedApi, SharedLib } from '@shared/index'
import { useMutation } from '@tanstack/react-query'
import { BotApi, BotService } from '@units/bot'

interface DeleteBotParams {
  id: string
}

export const useDeleteBot = () => {
  const botController = BotApi.BotControllerApi.getInstance(SharedApi.baseClient)
  return useMutation({
    mutationFn: (params: DeleteBotParams) => botController.deleteBot(params.id),
    onSuccess: () => {
      BotService.Stores.useBotSettingsStore.getState().setBotSettings(null)
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(SharedLib.Enums.QueryKey.Bots) ||
          query.queryKey.includes(SharedLib.Enums.QueryKey.Bot),
      })
    },
  })
}
