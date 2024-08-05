import {IRequestMeta, IResponseMeta} from '../../configs/client'
import {PATHNAME} from '../../configs/routes'
import {createQueryParams} from '../../utils/utils'
import {apiSlice} from '../apiSlice'
import {ICategory} from '../category/categoryApiSlice'

interface ProductType {
    id: number
    name: string
    description?: string
    attributes: Attribute[]
}

interface Attribute {
    id: number
    key: string
    valueType: string
}

export interface IProduct {
    id: number
    name: string
    description: string
    productType: ProductType
    categories: ICategory[]
    sku: string
    price: number
    images?: {
        id: string
        image: string
        alt_text: string
    }[]
    primary_image: {
        url: string
        alt_text: string
    }
    stockQuantity: number
    isActive: boolean
    weight?: number
    length?: number
    width?: number
    height?: number
}

interface IProductResponse {
    results: IProduct[]
    meta:IResponseMeta
    // Add other fields if necessary, such as total_count
}
export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<IProductResponse, IRequestMeta>({
            query: (params) => {
                const queryParams = createQueryParams(params)
                return `${PATHNAME.products}/?${queryParams}`
            },
            providesTags: ['Products'],
            merge: (currentCache: IProductResponse, newItems: IProductResponse) => {
                if (newItems.results) {
                    currentCache.results.push(...newItems.results)
                }
            },
        }),
        getProductDetails: builder.query<IProduct, number>({
            query: (id) => `${PATHNAME.products}/${id}`,
            providesTags: ['Product'],
        }),
    }),
})
export const {
    useGetProductsQuery,
    useLazyGetProductsQuery,
    useGetProductDetailsQuery,
    useLazyGetProductDetailsQuery,
} = productApiSlice
