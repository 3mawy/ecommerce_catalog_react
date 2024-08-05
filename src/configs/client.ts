export interface Filters {
  [key: string]: number | number[] | string | null
}

export interface IResponseError {
  status: number
  data: {
    message: string
    errors?: { [key: string]: string[] }
  }
}

export interface IResponse<T> {
  results: T[] | []
  meta: IResponseMeta | undefined
}

export interface ISimpleResponse<T> {
  data: T | null
}

export interface IResponseMeta {
  count: number
  next: string | null
  previous: string | null
  page: number
  num_pages: number
}

export type SortDirection = 'desc' | 'asc' | ''

export interface IRequestMeta {
  sort?: string
  search?: string
  page_size?: number | undefined
  page?: number | undefined
  filters?: Filters
}

export const PAGE_SIZE = 10
export const MIN_SEARCH_LENGTH = 2
