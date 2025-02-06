import { SharedLib, SharedUi } from '@shared/index'
import clsx from 'clsx'
import { InviteBotModal } from './ui'

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit: (data: any) => void
  className?: string
}

export function BotSettingsForm(props: Props) {
  const { onSubmit, className, ...otherProps } = props

  const {
    opened: isInviteBotModalOpen,
    open: openInviteBotModal,
    close: closeInviteBotModal,
  } = SharedLib.Hooks.useDisclosure()

  return (
    <form {...otherProps} className={clsx('flex gap-x-8', className)}>
      <div className="grow space-y-8 rounded-3xl bg-ui p-8">
        <SharedUi.Input placeholder="Name" label="Project name" />
        <SharedUi.TextArea
          placeholder="Put little description of your project here"
          label="Description"
          resize="none"
        />
        <SharedUi.TextArea
          placeholder="Put system prompt here"
          label="System prompt"
          rows={10}
          resize="none"
        />
        <SharedUi.UploadArea
          acceptedTypes={['.pdf', '.docx']}
          label="Upload knowledge base"
        />
        <SharedUi.Input placeholder="0x0000..." label="Token address (optional)" />
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
