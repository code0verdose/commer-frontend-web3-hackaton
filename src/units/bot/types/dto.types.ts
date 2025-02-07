export interface BotDto {
  id: string
  serverId: string
  name: string
  description: string
  contractAddress: string
}

export interface CreateBotDto {
  serverId: string
  name: string
  description: string
  contractAddress: string
}

export interface UpdateBotDto {
  name: string
  description: string
  contractAddress: string
}
