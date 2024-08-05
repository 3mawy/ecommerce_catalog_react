import { IRequestMeta } from '../../configs/client'
import { PATHNAME } from '../../configs/routes'
import { createQueryParams } from '../../utils/utils'
import { apiSlice, IResource } from '../apiSlice'


export interface ICategory extends IResource {
  name: string
  description?: string
  parent?: number
  slug: string
  is_active: boolean
  product_type: number
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  image?: string
  thumbnail?: string
  display_order: number
}


export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<ICategory[], IRequestMeta>({
      query: params => {
        const queryParams = createQueryParams(params)
        return `${PATHNAME.categories}?${queryParams}`
      },
      providesTags: ['Categories'],
    }),
    getCategoryDetails: builder.query<ICategory, number>({
      query: id => {
        return `${PATHNAME.categories}/${id}`
      },
      providesTags: ['Category'],
    }),
  }),
})
export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetCategoryDetailsQuery,
  useLazyGetCategoryDetailsQuery,
} = categoryApiSlice
