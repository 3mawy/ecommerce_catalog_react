import { IRequestMeta } from '../../configs/client'
import { PATHNAME } from '../../configs/routes'
import { createQueryParams } from '../../utils/utils'
import { apiSlice, IResource } from '../apiSlice'


interface Attribute {
  id: number
  key: string
  valueType: string
}

export interface IProductType extends IResource {
  name: string
  description?: string
  slug: string
  attributes: Attribute[]
  is_active: boolean
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  image?: string
  thumbnail?: string
  display_order: number
}


export const productTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProductTypes: builder.query<IProductType[], IRequestMeta>({
      query: params => {
        const queryParams = createQueryParams(params)
        return `${PATHNAME.productTypes}?${queryParams}`
      },
      providesTags: ['ProductTypes'],
    }),
    getProductTypeDetails: builder.query<IProductType, number>({
      query: id => {
        return `${PATHNAME.productTypes}/${id}`
      },
      providesTags: ['ProductType'],
    }),
  }),
})
export const {
  useGetProductTypesQuery,
  useLazyGetProductTypesQuery,
  useGetProductTypeDetailsQuery,
  useLazyGetProductTypeDetailsQuery,
} = productTypesApiSlice
