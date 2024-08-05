import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export interface IResource {
    id: number
    createdAt?: string
    updatedAt?: string
}

export interface IResourceForm<T extends IResource>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    extends Omit<T, 'id'> {
}

export const initResource: IResourceForm<IResource> = {
    created_at: '',
    updated_at: '',
}


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/api',
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: headers => {
        headers.set('X-Requested-With', 'XMLHttpRequest')
        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json')
        return headers
    },
})

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: [
        'Profile',
        'User',
        'Product',
        'Products',
        'Category',
        'Categories',
        'ProductType',
        'ProductTypes',
        'Attribute',
        'Attributes',
    ],
    endpoints: () => ({}),
})
