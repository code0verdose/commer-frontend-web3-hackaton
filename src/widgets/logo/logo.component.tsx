import { SharedUi } from '@shared/index'

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-3">
      <SharedUi.Icon className="size-8" name="logo" />
      <h1 className="text-xl font-semibold leading-none">Commify</h1>
    </a>
  )
}
