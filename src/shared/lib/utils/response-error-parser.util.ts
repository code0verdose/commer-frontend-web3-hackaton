export const responseErrorParser = (
  error: any,
  fallbackMessage: string = 'Something went wrong',
) => {
  const errorData = error?.response?.data?.error
  const message = Array.isArray(errorData) ? errorData[0] : errorData
  return message || fallbackMessage
}
