import { SharedTypes } from '@shared/index'
import { BotTypes } from '@units/bot'
import { AxiosInstance } from 'axios'

export class BotControllerApi {
  private static instance: BotControllerApi | null = null

  private readonly basePath: string

  private constructor(
    private readonly api: AxiosInstance,
    baseURL: string = '/bots',
  ) {
    this.basePath = baseURL
  }

  public static getInstance(
    api: AxiosInstance,
    baseURL: string = '/bots',
  ): BotControllerApi {
    if (!BotControllerApi.instance) {
      BotControllerApi.instance = new BotControllerApi(api, baseURL)
    }
    return BotControllerApi.instance
  }

  async getBots(params?: { limit: number; offset: number }): Promise<
    SharedTypes.BaseApiResponse<{
      items: BotTypes.Dto.BotDto[]
      totalItems: number
    }>
  > {
    const response = await this.api.get<
      SharedTypes.BaseApiResponse<{
        items: BotTypes.Dto.BotDto[]
        totalItems: number
      }>
    >(this.basePath, { params })
    return response.data
  }

  async createBot(
    data: BotTypes.Dto.CreateBotDto,
  ): Promise<SharedTypes.BaseApiResponse<BotTypes.Dto.BotDto>> {
    const response = await this.api.post<
      SharedTypes.BaseApiResponse<BotTypes.Dto.BotDto>
    >(this.basePath, data)
    return response.data
  }

  async getBot(id: string): Promise<SharedTypes.BaseApiResponse<BotTypes.Dto.BotDto>> {
    const response = await this.api.get<SharedTypes.BaseApiResponse<BotTypes.Dto.BotDto>>(
      `${this.basePath}/${id}`,
    )
    return response.data
  }

  async updateBot(
    id: string,
    data: BotTypes.Dto.UpdateBotDto,
  ): Promise<SharedTypes.BaseApiResponse<BotTypes.Dto.BotDto>> {
    const response = await this.api.put<SharedTypes.BaseApiResponse<BotTypes.Dto.BotDto>>(
      `${this.basePath}/${id}`,
      data,
    )
    return response.data
  }

  async deleteBot(id: string): Promise<void> {
    await this.api.delete(`${this.basePath}/${id}`)
  }
}
