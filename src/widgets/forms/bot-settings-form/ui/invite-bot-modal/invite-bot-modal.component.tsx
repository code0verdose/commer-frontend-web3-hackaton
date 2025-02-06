import { SharedLib, SharedUi } from '@shared/index'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function InviteBotModal(props: Props) {
  const { isOpen, onClose } = props

  return (
    <SharedUi.Modal contentClassName="w-[26.25rem]" isOpen={isOpen} onClose={onClose}>
      <h3 className="text-2xl font-semibold">Inviting Bot</h3>
      <p className="mt-8 text-lg leading-7">
        A platform for setting up a community manager for Discord, automating moderation,
        engagement, and member support.
      </p>
      <a
        className="mt-3 block text-lg leading-7 text-[#0093ff] underline"
        href={SharedLib.Constants.DISCORD_BOT_INVITE_URL}
        target="_blank"
        rel="noreferrer"
      >
        {SharedLib.Constants.DISCORD_BOT_INVITE_URL}
      </a>
      <p className="mt-8 text-lg leading-7">
        Once Bot is added and community manager is set up you&apos;re ready to make a
        deployment
      </p>
      <SharedUi.Button
        onClick={onClose}
        className="button-gradient mt-8 w-full rounded-xl px-4 py-3"
      >
        I have invited bot
      </SharedUi.Button>
    </SharedUi.Modal>
  )
}
