export type BaseApiResponse<T> = {
  data: T
  errors: string[]
  status: number
}
