import {PayloadAction, SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'

import {IRequestMeta, IResponseError, PAGE_SIZE} from '../configs/client'

export const rtkError = (error: SerializedError | FetchBaseQueryError) => {
    let errorMessage: string = ''
    if ('status' in error) {
        const responseError = error as IResponseError
        if (responseError.data) {
            errorMessage =
                'message' in responseError.data
                    ? (responseError.data.message as string)
                    : JSON.stringify(error.data)
        }
    } else {
        errorMessage = error.message || ''
    }
    return errorMessage
}

export function hasUnauthenticatedErrorMessage(
    action: PayloadAction<IResponseError>,
): boolean {
    return action.payload?.status === 401
}

export const createQueryParams = (
    params: IRequestMeta,
): string => {
    const {
        sort = 'created_at',
        page_size: limit = PAGE_SIZE,
        page = null,
        search = '',
        filters = {},
    } = params
    const queryParams = new URLSearchParams()

    if (sort) {
        queryParams.append('sort', sort)
    }
    if (limit) {
        queryParams.append('page_size', String(limit))
    }
    if (page) {
        queryParams.append('page', String(page))
    }
    if (search) {
        queryParams.append('search', search)
    }

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                queryParams.append(`${key}`, String(value))
            }
        })
    }

    return queryParams.toString()
}
