import { SharedUi } from '@shared/index'
import { useQuery } from '@tanstack/react-query'
import { BotLib, BotService, BotTypes } from '@units/bot'
import { BotSettingsForm } from '@widgets/forms'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

interface Props extends React.ComponentPropsWithoutRef<'section'> {}

export function SettingsSection(props: Props) {
  const { className, ...otherProps } = props

  const { createBotStatus, createBotFlow } = BotLib.Hooks.useBotCreation()
  const { botSettings, setBotSettings } = BotService.Stores.useBotSettingsStore()

  const botQuery = useQuery(
    BotService.Queries.getBotOptions({
      queryParams: { id: botSettings?.id! },
      options: { enabled: !!botSettings?.id },
    }),
  )

  const { mutateAsync: deleteBot, isPending: isDeleting } =
    BotService.Mutations.useDeleteBot()
  const { mutateAsync: updateBot, isPending: isUpdating } =
    BotService.Mutations.useUpdateBot()

  const [formKey, setFormKey] = useState(0)

  const handleUpdateBot = async (data: Partial<BotTypes.Dto.UpdateBotDto>) => {
    if (botSettings) {
      await updateBot({ id: botSettings.id, payload: data })
    }
  }

  const handleDeleteBot = async () => {
    if (botSettings) {
      await deleteBot({ id: botSettings.id })
      setBotSettings(null)
    }
  }

  const handleAddNewBot = () => {
    setBotSettings(null)
    setFormKey(prev => prev + 1)
  }

  const defaultValues = useMemo(() => {
    if (botQuery.data) {
      return {
        name: botQuery.data.name,
        description: botQuery.data.description,
        contractAddress: botQuery.data.contractAddress ?? undefined,
      }
    }

    return undefined
  }, [botQuery.data])

  const renderStatus = () => {
    if (isUpdating) return 'Updating...'
    if (isDeleting) return 'Deleting...'
    return createBotStatus
  }

  return (
    <section className={clsx('', className)} {...otherProps}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">
          {botSettings ? 'Settings' : 'Create bot'}
        </h2>
        <SharedUi.Button
          className="button-gradient-light border-gradient rounded-xl px-4 py-3 hover:bg-brand/20 active:bg-brand"
          onClick={handleAddNewBot}
        >
          + Add new one
        </SharedUi.Button>
      </div>
      <BotSettingsForm
        key={formKey}
        defaultValues={defaultValues}
        className="mt-8"
        onSubmit={botSettings ? handleUpdateBot : createBotFlow}
        onDelete={handleDeleteBot}
        status={botQuery.isLoading ? 'Updating...' : renderStatus()}
      />
    </section>
  )
}
