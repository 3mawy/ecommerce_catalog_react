import {IRequestMeta} from '../../configs/client'
import {PATHNAME} from '../../configs/routes'
import {createQueryParams} from '../../utils/utils'
import {apiSlice, IResource} from '../apiSlice'


export interface IAttribute extends IResource {
    name: string
    data_type: 'string' | 'integer' | 'float' | 'boolean' | 'date' | 'choice'
    choices?: { choices: string[] }
}

export const attributeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAttributes: builder.query<IAttribute[], IRequestMeta>({
            query: params => {
                const queryParams = createQueryParams(params)
                return `${PATHNAME.attributes}?${queryParams}`
            },
            providesTags: ['Attributes'],
        }),
        getAttributeDetails: builder.query<IAttribute, number>({
            query: id => {
                return `${PATHNAME.attributes}/${id}`
            },
            providesTags: ['Attribute'],
        }),
    }),
})
export const {
    useGetAttributesQuery,
    useLazyGetAttributesQuery,
    useGetAttributeDetailsQuery,
    useLazyGetAttributeDetailsQuery,
} = attributeApiSlice
