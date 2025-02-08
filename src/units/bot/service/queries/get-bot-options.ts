import { SharedApi, SharedLib } from '@shared/index'
import { queryOptions } from '@tanstack/react-query'
import { BotApi } from '@units/bot'

interface GetBotOptionsInterface {
  queryParams: {
    id: string
  }
  options: {
    enabled?: boolean
  }
}

export const getBotOptions = (params: GetBotOptionsInterface) => {
  const { queryParams } = params

  const botController = BotApi.BotControllerApi.getInstance(SharedApi.baseClient)
  return queryOptions({
    queryKey: [SharedLib.Enums.QueryKey.Bot, queryParams],
    queryFn: async () => {
      const response = await botController.getBot(queryParams.id)
      return response.data
    },
    ...params.options,
  })
}
