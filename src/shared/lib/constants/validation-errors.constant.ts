export const ValidationErrors = {
  RequiredField: 'This field is required',
  RequiredTrue: 'Must accept',
  TokenAddress: 'Invalid token address',
  InvalidProjectName: 'Invalid project name',
  InvalidDescription: 'Invalid description',
  InvalidSystemPrompt: 'Invalid system prompt',
  InvalidFile: 'Invalid file format. Only PDF and DOCX files are allowed',
  FieldMinLength: (length: number) => `Field must be at least ${length} characters long`,
  FieldMaxLength: (length: number) =>
    `Field must be no more than ${length} characters long`,
  Required: (field: string) => `${field} is required`,
}
