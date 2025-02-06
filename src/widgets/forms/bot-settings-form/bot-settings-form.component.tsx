import { SharedUi } from '@shared/index'
import clsx from 'clsx'

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  onSubmit: (data: any) => void
  className?: string
}

export function BotSettingsForm(props: Props) {
  const { onSubmit, className, ...otherProps } = props

  return (
    <form {...otherProps} className={clsx('flex gap-x-8', className)}>
      <div className="grow space-y-8 rounded-3xl bg-ui p-8">
        <SharedUi.Input placeholder="Name input" label="Project name" />
        <SharedUi.TextArea
          placeholder="Put little description of your project here"
          label="Description"
          resize="none"
        />
        <SharedUi.TextArea
          placeholder="Put system prompt here"
          label="System promt"
          rows={10}
          resize="none"
        />
        <SharedUi.UploadArea label="Upload knowledge base" />
        <SharedUi.Input
          placeholder="0x0000000000000000000000000000000000000000"
          label="Token address"
        />
      </div>
      <div className="h-fit w-[26.25rem] space-y-8 rounded-3xl bg-ui p-8">
        <SharedUi.Button
          className="button-gradient w-full rounded-xl px-4 py-3"
          type="submit"
        >
          Deploy
        </SharedUi.Button>
      </div>
    </form>
  )
}
