import { SharedUi } from '@shared/index'
import { BotService } from '@units/bot'
import clsx from 'clsx'
import { FieldErrors, UseFormWatch } from 'react-hook-form'
import { z } from 'zod'

type BotSettingsFormData = z.infer<typeof BotService.Schemas.botSettingsValidationSchema>

interface Props {
  watch: UseFormWatch<BotSettingsFormData>
  formState: {
    errors: FieldErrors<BotSettingsFormData>
  }
}

export function CheckupList({ watch, formState }: Props) {
  const nameValue = watch('name')
  const descriptionValue = watch('description')
  const serverIdValue = watch('serverId')
  // const contractAddressValue = watch('contractAddress')
  // const systemPromptValue = watch('systemPrompt')
  // const knowledgeBaseValue = watch('knowledgeBase')

  const requiredFields = [
    {
      name: 'name',
      label: 'Project name',
      value: nameValue,
      isValid: !formState.errors.name && nameValue !== '',
    },
    {
      name: 'serverId',
      label: 'Server ID',
      value: serverIdValue,
      isValid: !formState.errors.serverId && serverIdValue !== '',
    },
    {
      name: 'description',
      label: 'Description',
      value: descriptionValue,
      isValid: !formState.errors.description && descriptionValue !== '',
    },

    // {
    // name: 'systemPrompt',
    //   label: 'System prompt',
    //   value: systemPromptValue,
    //   isValid: !formState.errors.systemPrompt && systemPromptValue !== '',
    // },
    // {
    //   name: 'knowledgeBase',
    //   label: 'Knowledge base',
    //   value: knowledgeBaseValue,
    //   isValid: !formState.errors.knowledgeBase && knowledgeBaseValue.length > 0,
    // },
  ]

  return (
    <ul className="space-y-6">
      {requiredFields.map((field) => (
        <li key={field.name} className="flex items-center gap-x-2.5">
          <SharedUi.Icon
            className="size-8"
            name={field.isValid ? 'checked' : 'unchecked'}
          />
          <p className={clsx(field.isValid && 'text-gradient')}>{field.label}</p>
        </li>
      ))}
    </ul>
  )
}
