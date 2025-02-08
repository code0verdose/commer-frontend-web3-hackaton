import { create } from 'zustand'

interface BotSettings {
  id: string
  name: string
  description: string
  contractAddress?: string
}

interface BotSettingsStore {
  botSettings: BotSettings | null
  setBotSettings: (botSettings: BotSettings | null) => void
}

export const useBotSettingsStore = create<BotSettingsStore>((set) => ({
  botSettings: null,
  setBotSettings: (botSettings) => set({ botSettings }),
}))
