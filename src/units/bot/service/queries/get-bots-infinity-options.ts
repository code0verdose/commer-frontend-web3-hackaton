import { SharedApi, SharedLib } from '@shared/index'
import { infiniteQueryOptions } from '@tanstack/react-query'
import { BotApi } from '@units/bot'

export const getBotsInfinityOptions = (options: { enabled: boolean }) => {
  const botController = BotApi.BotControllerApi.getInstance(SharedApi.baseClient)
  return infiniteQueryOptions({
    queryKey: [SharedLib.Enums.QueryKey.Bots],
    queryFn: ({ pageParam = 0 }) =>
      botController.getBots({ limit: 5, offset: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage?.data?.totalItems ?? 0
      const totalItemsLoaded = allPages.flatMap((page) => page?.data?.items).length
      return totalItemsLoaded < totalItems ? totalItemsLoaded : undefined
    },
    initialPageParam: 0,
    select: (result) => ({
      items: result.pages.flatMap((page) => page?.data?.items),
      totalItems: result.pages[0]?.data?.totalItems,
    }),
    ...options,
  })
}
