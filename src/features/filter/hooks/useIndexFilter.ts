import { useCallback,useMemo, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import {useAppSelector} from '../../../app/hooks'
import { RootState } from '../../../app/store'
import { Filters,IRequestMeta, PAGE_SIZE, SortDirection } from '../../../configs/client'
import {resetData, selectPage, setCurrentPage} from '../../pagination/paginationSlice'
import {
    addSelectedCategory,
    removeSelectedCategory,
    resetFilters,
    setFilterSidebar,
    setSelectedAttributes,
    setSelectedCategories,
    setSelectedType,
} from '../filterSlice'


export const useIndexFilter = (
    initialPageSize = PAGE_SIZE,
    initialSortBy = 'created_at',
    initialSortDirection: SortDirection = 'desc',
    initialSearch = '',
) => {
    const dispatch = useDispatch()
    const {
        selectedType,
        selectedCategories,
        selectedAttributes,
        isSidebarOpen,
    } = useSelector((state: RootState) => state.filters)

    const page = useAppSelector(selectPage)

    const [pageSize, setPageSize] = useState(initialPageSize)
    const [sort, setSort] = useState(initialSortBy)
    const [sortDirection, setSortDirection] = useState(initialSortDirection)
    const [search, setSearch] = useState(initialSearch)

    // useEffect(() => {
    //     // Reset page to 1 when filters or sort options change
    //     dispatch(setCurrentPage(1));
    // }, [selectedType, selectedCategories, selectedAttributes, sort, sortDirection, search, pageSize, dispatch]);

    const handlePageChange = useCallback(() => {
        dispatch(setCurrentPage(page+1))
    }, [dispatch,page])

    const handleSetPage = useCallback((newPage: number) => {
        dispatch(setCurrentPage(newPage))
    }, [dispatch])

    const handlePageSizeChange = useCallback((newPageSize: number) => {
        setPageSize(newPageSize)
    }, [setPageSize])

    const handleSortChange = useCallback((sortField: string, direction: SortDirection) => {
        setSort(sortField)
        setSortDirection(direction)
    }, [])

    const handleSearchChange = useCallback((value: string) => {
        handleSetPage(1)
        setSearch(value)
        dispatch(resetData())
    }, [handleSetPage, dispatch])

    const handleTypeChange = useCallback((type: { id: number | null; name: string | null }) => {
        dispatch(setSelectedType(type))
    }, [dispatch])

    const handleCategoryChange = useCallback((categories: { id: number; name: string }[]) => {
        dispatch(setSelectedCategories(categories))
    }, [dispatch])

    const handleCategoryAdd = useCallback((category: { id: number; name: string }) => {
        dispatch(addSelectedCategory(category))
    }, [dispatch])

    const handleCategoryRemove = useCallback((categoryId: number) => {
        dispatch(removeSelectedCategory(categoryId))
    }, [dispatch])

    const handleAttributesChange = useCallback((attributeName: string, value: string | boolean, isSelected: boolean) => {
        const updatedAttributes = { ...selectedAttributes }

        if (typeof value === 'boolean') {
            if (value) {
                updatedAttributes[attributeName] = [true]
            } else {
                delete updatedAttributes[attributeName]
            }
        } else {
            if (!Array.isArray(updatedAttributes[attributeName])) {
                updatedAttributes[attributeName] = []
            }

            if (isSelected) {
                updatedAttributes[attributeName] = updatedAttributes[attributeName].filter(val => val !== value)

                if (updatedAttributes[attributeName].length === 0) {
                    delete updatedAttributes[attributeName]
                }
            } else {
                updatedAttributes[attributeName] = [...updatedAttributes[attributeName], value]
            }
        }

        dispatch(setSelectedAttributes(updatedAttributes))
    }, [dispatch, selectedAttributes])

    const handleSidebarOpen = useCallback((open: boolean) => {
        dispatch(setFilterSidebar(open))
    }, [dispatch])

    const handleResetFilters = useCallback(() => {
        dispatch(resetFilters())
    }, [dispatch])

    const categoryIds = useMemo(() => selectedCategories.map(category => category.id).join(','), [selectedCategories])

    const filters: Filters = useMemo(() => ({
        product_type: selectedType?.id,
        categories: categoryIds || null,
        attributes: JSON.stringify(selectedAttributes) || '{}',
    }), [selectedType, categoryIds, selectedAttributes])

    const meta: IRequestMeta = useMemo(() => ({
        page,
        page_size: pageSize,
        sort: sortDirection === 'desc' ? `-${sort}` : sort,
        search,
        filters,
    }), [page, pageSize, sort, sortDirection, search, filters])

    return {
        meta,
        handleSetPage,
        isSidebarOpen,
        handlePageChange,
        handlePageSizeChange,
        handleSortChange,
        handleSearchChange,
        handleTypeChange,
        handleCategoryAdd,
        handleCategoryRemove,
        handleCategoryChange,
        handleAttributesChange,
        handleSidebarOpen,
        handleResetFilters
    }
}
