export const BASE_API_URL = (import.meta.env.VITE_BASE_API_URL as string) ?? ''
export const DISCORD_BOT_INVITE_URL =
  (import.meta.env.VITE_DISCORD_BOT_INVITE_URL as string) ?? ''

export const FACTORY_ADDRESS =
  (import.meta.env.VITE_FACTORY_ADDRESS as `0x${string}`) ?? ''
export const TOKEN_ADDRESS = (import.meta.env.VITE_TOKEN_ADDRESS as `0x${string}`) ?? ''
export const AGENT_ADDRESS = (import.meta.env.VITE_AGENT_ADDRESS as `0x${string}`) ?? ''
export const TOKEN_DECIMALS = (import.meta.env.VITE_TOKEN_DECIMALS as string) ?? ''
export const TOKEN_AMOUNT = (import.meta.env.VITE_TOKEN_AMOUNT as string) ?? ''
