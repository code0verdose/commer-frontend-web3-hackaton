import { ValidationErrors } from '@shared/lib/constants/validation-errors.constant'
import { z } from 'zod'

export const botSettingsValidationSchema = z.object({
  name: z
    .string()
    .min(1, ValidationErrors.RequiredField)
    .max(50, ValidationErrors.FieldMaxLength(50)),

  description: z
    .string()
    .min(1, ValidationErrors.RequiredField)
    .max(500, ValidationErrors.FieldMaxLength(500)),

  systemPrompt: z
    .string()
    .min(1, ValidationErrors.RequiredField)
    .max(2000, ValidationErrors.FieldMaxLength(2000)),

  knowledgeBase: z.array(z.custom<File>()).refine((files) => {
    if (!files) return true
    return files.every(
      (file) =>
        file.type === 'application/pdf' ||
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    )
  }, ValidationErrors.InvalidFile),

  tokenAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, ValidationErrors.TokenAddress)
    .optional(),
})

export type BotSettingsFormData = z.infer<typeof botSettingsValidationSchema>
