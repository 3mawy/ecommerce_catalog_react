import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {RootState} from '../../app/store'

interface FilterState {
    selectedType: { id: number | null; name: string | null }
    selectedCategories: { id: number; name: string }[]
    selectedAttributes: { [key: string]: (string | boolean)[] }
    search: string
    isSidebarOpen: boolean
}

const initialState: FilterState = {
    selectedType: {id: null, name: null},
    selectedCategories: [],
    selectedAttributes: {},
    search: '',
    isSidebarOpen: false,
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSelectedType(state, action: PayloadAction<{ id: number | null; name: string | null }>) {
            state.selectedType = action.payload
        },
        setSelectedCategories(state, action: PayloadAction<{ id: number; name: string }[]>) {
            state.selectedCategories = action.payload
        },
        addSelectedCategory(state, action: PayloadAction<{ id: number; name: string }>) {
            state.selectedCategories = [...state.selectedCategories, action.payload]
        },
        removeSelectedCategory(state, action: PayloadAction<number>) {
            state.selectedCategories = state.selectedCategories.filter(category => category.id !== action.payload)
        },
        setSelectedAttributes(state, action: PayloadAction<{ [key: string]: (string | boolean)[] }>) {
            state.selectedAttributes = action.payload
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
        },
        setFilterSidebar(state, action: PayloadAction<boolean>) {
            state.isSidebarOpen = action.payload
        },
        resetFilters() {
            return initialState
        },
    },
})

export const {
    setSelectedType,
    setSelectedCategories,
    setSearch,
    setSelectedAttributes,
    setFilterSidebar,
    addSelectedCategory,
    removeSelectedCategory,
    resetFilters,
} = filterSlice.actions

export const selectSelectedType = (state: RootState) => state.filters.selectedType
export const selectSelectedCategories = (state: RootState) => state.filters.selectedCategories
export const selectSelectedAttributes = (state: RootState) => state.filters.selectedAttributes
export const selectSearch = (state: RootState) => state.filters.search // Selector for search state
export const selectIsSidebarOpen = (state: RootState) => state.filters.isSidebarOpen
