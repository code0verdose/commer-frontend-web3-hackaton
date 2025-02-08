export interface CreateBotDto {
  serverId: string
  name: string
  description: string
  contractAddress?: string
}

export interface BotsDto {
  id: string
  name: string
  description: string
  status: number
  contractAddress?: string
}

export interface BotDto {
  id: string
  name: string
  description: string
  contractAddress: string | null
  status: number
  createdAt: string
  updatedAt: string
}

export interface UpdateBotDto {
  name?: string
  description?: string
  contractAddress?: string
}
