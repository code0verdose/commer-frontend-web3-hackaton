import { zodResolver } from '@hookform/resolvers/zod'
import { SharedLib, SharedUi } from '@shared/index'
import { BotService, BotTypes } from '@units/bot'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CheckupList, InviteBotModal } from './ui'

type BotSettingsFormData = z.infer<typeof BotService.Schemas.botSettingsValidationSchema>

interface Props extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  className?: string
}

export function BotSettingsForm(props: Props) {
  const { className, ...otherProps } = props

  const { mutateAsync: createBot, isPending } = BotService.Mutations.useCreateBot()

  const onSubmit = async (data: BotTypes.Dto.CreateBotDto) => {
    await createBot(data)
  }

  const { control, handleSubmit, formState, watch, reset } = useForm<BotSettingsFormData>(
    {
      resolver: zodResolver(BotService.Schemas.botSettingsValidationSchema),
      defaultValues: {
        name: '',
        description: '',
        serverId: '',
        // contractAddress: '',
        // systemPrompt: '',
        // knowledgeBase: [],
      },
      mode: 'onChange',
    },
  )

  const {
    opened: isInviteBotModalOpen,
    open: openInviteBotModal,
    close: closeInviteBotModal,
  } = SharedLib.Hooks.useDisclosure()

  const handleFormSubmit = async (data: BotSettingsFormData) => {
    await onSubmit(data)
    reset()
  }

  return (
    <form
      {...otherProps}
      className={clsx('flex gap-x-8', className)}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className="grow space-y-8 rounded-3xl bg-ui p-8">
        <SharedUi.InputControl
          control={control}
          name="name"
          placeholder="Name"
          label="Project name"
        />
        <SharedUi.InputControl
          control={control}
          name="serverId"
          placeholder="Server ID"
          label="Server ID"
        />
        <SharedUi.TextAreaControl
          control={control}
          name="description"
          placeholder="Put little description of your project here"
          label="Description"
          resize="none"
        />
        {/* <SharedUi.TextAreaControl
          control={control}
          name="systemPrompt"
          placeholder="Put system prompt here"
          label="System prompt"
          rows={10}
          resize="none"
        />
        <SharedUi.UploadAreaControl
          control={control}
          name="knowledgeBase"
          acceptedTypes={['.pdf', '.docx']}
          label="Upload knowledge base"
        /> */}
        <SharedUi.InputControl
          control={control}
          name="contractAddress"
          placeholder="0x0000..."
          label="Token address (optional)"
        />
        <SharedUi.Button
          className="button-gradient w-full rounded-xl px-4 py-3"
          onClick={openInviteBotModal}
        >
          Invite Bot
        </SharedUi.Button>
      </div>
      <div>
        <div className="sticky top-8 h-fit w-[26.25rem] space-y-8 rounded-3xl bg-ui p-8">
          <CheckupList watch={watch} formState={formState} />
          <SharedUi.Button
            className="button-gradient w-full rounded-xl px-4 py-3"
            type="submit"
            disabled={isPending}
          >
            Deploy
          </SharedUi.Button>
          {isPending && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
              <SharedUi.Loader className="mb-8 size-20" />
            </div>
          )}
        </div>
      </div>
      <InviteBotModal isOpen={isInviteBotModalOpen} onClose={closeInviteBotModal} />
    </form>
  )
}
