export const responseErrorParser = (
  error: any,
  fallbackMessage: string = 'Something went wrong',
) => {
  const message = error?.response?.data?.errors?.[0]
  return message || fallbackMessage
}
