
export interface CreateBotDto {
  serverId: string
  name: string
  description: string
  contractAddress?: string
}

export interface BotDto {
  id: string
  name: string
  description: string
  status: number
}

export interface UpdateBotDto {
  name?: string
  description?: string
}
