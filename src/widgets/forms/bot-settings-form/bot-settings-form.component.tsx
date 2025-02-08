import { zodResolver } from '@hookform/resolvers/zod'
import { SharedLib, SharedUi } from '@shared/index'
import { BotService } from '@units/bot'
import clsx from 'clsx'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CheckupList, InviteBotModal } from './ui'

type BotSettingsFormData = z.infer<typeof BotService.Schemas.botSettingsValidationSchema>

interface Props extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  className?: string
  onSubmit?: (data: BotSettingsFormData) => void
  status: string | null
  defaultValues?: Partial<BotSettingsFormData>
  onDelete?: () => void
}

export function BotSettingsForm(props: Props) {
  const { className, onSubmit, status, defaultValues, onDelete, ...otherProps } = props
  const isEditMode = !!defaultValues

  const { control, handleSubmit, formState, watch, reset } = useForm<BotSettingsFormData>(
    {
      resolver: zodResolver(
        isEditMode
          ? BotService.Schemas.botSettingsValidationSchema.omit({ serverId: true })
          : BotService.Schemas.botSettingsValidationSchema,
      ),
      defaultValues: defaultValues || {
        name: '',
        description: '',
        serverId: '',
      },
      mode: 'onChange',
    },
  )

  React.useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  const {
    opened: isInviteBotModalOpen,
    open: openInviteBotModal,
    close: closeInviteBotModal,
  } = SharedLib.Hooks.useDisclosure()

  const handleFormSubmit = async (data: BotSettingsFormData) => {
    console.log(data)
    await onSubmit?.(data)
    reset()
  }

  return (
    <form
      {...otherProps}
      className={clsx('flex gap-x-8', className)}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="relative grow space-y-8 rounded-3xl bg-ui p-8">
        <SharedUi.InputControl
          control={control}
          name="name"
          placeholder="Name"
          label="Project name"
          disabled={status !== null}
        />
        {!isEditMode && (
          <SharedUi.InputControl
            control={control}
            name="serverId"
            placeholder="Server ID"
            label="Server ID"
            disabled={status !== null}
          />
        )}
        <SharedUi.TextAreaControl
          control={control}
          name="description"
          placeholder="Put little description of your project here"
          label="Description"
          resize="none"
          disabled={status !== null}
        />
        <SharedUi.InputControl
          control={control}
          name="contractAddress"
          placeholder="0x0000..."
          label="Token address (optional)"
          disabled={status !== null}
        />
        <SharedUi.Button
          className="button-gradient w-full rounded-xl px-4 py-3"
          onClick={openInviteBotModal}
          disabled={status !== null}
        >
          Invite Bot
        </SharedUi.Button>
      </div>
      <div>
        <div className="sticky top-8 h-fit w-[26.25rem] space-y-8 rounded-3xl bg-ui p-8">
          <CheckupList watch={watch} formState={formState} />
          <div className="flex flex-col gap-y-4">
            <SharedUi.Button
              className="button-gradient w-full rounded-xl px-4 py-3"
              type="submit"
              disabled={status !== null}
            >
              {isEditMode ? 'Update' : 'Deploy'}
            </SharedUi.Button>
            {isEditMode && (
              <SharedUi.Button
                className="button-gradient-red w-full rounded-xl px-4 py-3"
                onClick={() => {
                  onDelete?.()
                  reset({
                    name: '',
                    description: '',
                    serverId: '',
                  })
                }}
              >
                Delete
              </SharedUi.Button>
            )}
          </div>
          {status !== null && (
            <div className="absolute -top-8 bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-center bg-black/80">
              <SharedUi.Loader className="mb-8 size-20" />
              <h4 className="text-lg font-medium">{status}</h4>
            </div>
          )}
        </div>
      </div>
      <InviteBotModal isOpen={isInviteBotModalOpen} onClose={closeInviteBotModal} />
    </form>
  )
}
