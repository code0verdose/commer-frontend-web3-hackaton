import { SharedLib } from '@shared/index'

import { z } from 'zod'

export const botSettingsValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: SharedLib.Constants.ValidationErrors.Required('Name') })
    .max(50, { message: SharedLib.Constants.ValidationErrors.FieldMaxLength(50) }),

  serverId: z
    .string()
    .min(1, { message: SharedLib.Constants.ValidationErrors.Required('Server ID') })
    .max(50, { message: SharedLib.Constants.ValidationErrors.FieldMaxLength(50) }),

  description: z
    .string()
    .min(1, { message: SharedLib.Constants.ValidationErrors.Required('Description') })
    .max(500, { message: SharedLib.Constants.ValidationErrors.FieldMaxLength(500) }),

  // systemPrompt: z
  //   .string()
  //   .min(1, { message: SharedLib.Constants.ValidationErrors.Required('System prompt') })
  //   .max(2000, { message: SharedLib.Constants.ValidationErrors.FieldMaxLength(2000) }),

  // knowledgeBase: z
  //   .array(z.custom<File>())
  //   .min(1, { message: SharedLib.Constants.ValidationErrors.Required('Knowledge base') })
  //   .refine(
  //     (files) => {
  //       if (!files) return true
  //       return files.every(
  //         (file) =>
  //           file.type === 'application/pdf' ||
  //           file.type ===
  //             'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  //       )
  //     },
  //     { message: SharedLib.Constants.ValidationErrors.InvalidFile },
  //   ),

  contractAddress: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true
        return /^0x[a-fA-F0-9]{40}$/.test(value)
      },
      { message: SharedLib.Constants.ValidationErrors.TokenAddress },
    ),
})
