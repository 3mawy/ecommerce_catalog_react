import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { resetFilters } from '../filter/filterSlice'
import { IProduct } from '../product/productApiSlice'

interface PaginationSliceState {
    data: IProduct[]
    page: number
}

const initialState: PaginationSliceState = {
    data: [],
    page: 1,
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setPaginatedData: (state, action: PayloadAction<IProduct[]>) => {
            state.data = action.payload
        },
        appendPaginatedData: (state, action: PayloadAction<IProduct[]>) => {
            state.data = [...state.data, ...action.payload]
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        resetData: (state) => {
            state.data = initialState.data
            state.page = 1
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetFilters, (state) => {
            state.data = initialState.data
            state.page = initialState.page
        })
    },
})

export const {
    setPaginatedData,
    appendPaginatedData,
    setCurrentPage,
    resetData,
} = paginationSlice.actions

export const selectPage = (state: { pagination: PaginationSliceState }) => state.pagination.page
export const selectPaginatedData = (state: { pagination: PaginationSliceState }) => state.pagination.data

export const selectPaginatedDataLength = (state: { pagination: PaginationSliceState }) => state.pagination.data.length

export const selectPaginatedDataById = (id: number) => (state: { pagination: PaginationSliceState }) =>
    state.pagination.data.find(product => product.id === id)

export default paginationSlice.reducer
