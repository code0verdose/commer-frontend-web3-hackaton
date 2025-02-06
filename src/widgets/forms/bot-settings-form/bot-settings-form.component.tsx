import { zodResolver } from '@hookform/resolvers/zod'
import { SharedLib, SharedUi } from '@shared/index'
import { BotService } from '@units/bot'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InviteBotModal } from './ui'

type BotSettingsFormData = z.infer<typeof BotService.Schemas.botSettingsValidationSchema>

interface Props extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (data: BotSettingsFormData) => void
  className?: string
}

export function BotSettingsForm(props: Props) {
  const { onSubmit, className, ...otherProps } = props

  const { control, handleSubmit } = useForm<BotSettingsFormData>({
    resolver: zodResolver(BotService.Schemas.botSettingsValidationSchema),
    defaultValues: {
      name: '',
      description: '',
      systemPrompt: '',
      knowledgeBase: [],
      tokenAddress: '',
    },
    mode: 'onChange',
  })

  const {
    opened: isInviteBotModalOpen,
    open: openInviteBotModal,
    close: closeInviteBotModal,
  } = SharedLib.Hooks.useDisclosure()

  return (
    <form
      {...otherProps}
      className={clsx('flex gap-x-8', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grow space-y-8 rounded-3xl bg-ui p-8">
        <SharedUi.InputControl
          control={control}
          name="name"
          placeholder="Name"
          label="Project name"
        />
        <SharedUi.TextAreaControl
          control={control}
          name="description"
          placeholder="Put little description of your project here"
          label="Description"
          resize="none"
        />
        <SharedUi.TextAreaControl
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
        />
        <SharedUi.InputControl
          control={control}
          name="tokenAddress"
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
      <div className="h-fit w-[26.25rem] space-y-8 rounded-3xl bg-ui p-8">
        <SharedUi.Button
          className="button-gradient w-full rounded-xl px-4 py-3"
          type="submit"
        >
          Deploy
        </SharedUi.Button>
      </div>
      <InviteBotModal isOpen={isInviteBotModalOpen} onClose={closeInviteBotModal} />
    </form>
  )
}
