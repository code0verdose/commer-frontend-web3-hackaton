export interface SignInDto {
  walletAddress: string
  signature: string
}

export interface TokensDto {
  accessToken: string
  refreshToken: string
}

export interface LogoutDto {
  refreshToken: string
}
