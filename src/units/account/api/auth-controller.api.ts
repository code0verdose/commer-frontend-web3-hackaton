import { SharedTypes } from '@shared/index'
import { AccountTypes } from '@units/account'
import { AxiosInstance } from 'axios'

export class AuthControllerApi {
  private static instance: AuthControllerApi | null = null

  private readonly basePath: string

  private constructor(
    private readonly api: AxiosInstance,
    baseURL: string = '/auth',
  ) {
    this.basePath = baseURL
  }

  public static getInstance(
    api: AxiosInstance,
    baseURL: string = '/auth',
  ): AuthControllerApi {
    if (!AuthControllerApi.instance) {
      AuthControllerApi.instance = new AuthControllerApi(api, baseURL)
    }
    return AuthControllerApi.instance
  }

  async signIn(
    data: AccountTypes.Dto.SignInDto,
  ): Promise<SharedTypes.BaseApiResponse<AccountTypes.Dto.TokensDto>> {
    const response = await this.api.post<
      SharedTypes.BaseApiResponse<AccountTypes.Dto.TokensDto>
    >(`${this.basePath}/sign-in`, data)
    return response.data
  }

  async refresh(
    data: AccountTypes.Dto.TokensDto,
  ): Promise<SharedTypes.BaseApiResponse<AccountTypes.Dto.TokensDto>> {
    const response = await this.api.post<
      SharedTypes.BaseApiResponse<AccountTypes.Dto.TokensDto>
    >(`${this.basePath}/refresh`, data)
    return response.data
  }

  async logout(data: AccountTypes.Dto.LogoutDto): Promise<void> {
    await this.api.delete(`${this.basePath}/logout`, { data })
  }

  async getNonce(
    walletAddress: string,
  ): Promise<SharedTypes.BaseApiResponse<{ nonce: string }>> {
    const response = await this.api.get<SharedTypes.BaseApiResponse<{ nonce: string }>>(
      `${this.basePath}/${walletAddress}/nonce`,
    )
    return response.data
  }
}
