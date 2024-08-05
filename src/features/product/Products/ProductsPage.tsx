import {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../app/hooks'
import { CatalogHeader } from '../../../components/Catalog/CatalogHeader'
import ProductGrid from '../../../components/Catalog/ProductGrid'
import Filter from '../../../components/Filter/Filter'
import MobileFilter from '../../../components/Filter/MobileFilter'
import SearchBar from '../../../components/SearchBar'
import useInfiniteScroll from '../../../hooks/useInfinteScroll'
import { useSyncQueryParamsWithState, useSyncStateWithQueryParams } from '../../../hooks/useSyncReduxQueryParams'
import toast from '../../../utils/toast'
import { selectSelectedType } from '../../filter/filterSlice'
import { useIndexFilter } from '../../filter/hooks/useIndexFilter'
import {appendPaginatedData, selectPaginatedData} from '../../pagination/paginationSlice'
import {IProduct, useGetProductsQuery} from '../productApiSlice'

const ProductsPage = () => {
    const dispatch = useDispatch()

    const {
        meta: requestMeta,
        handleSearchChange,
    } = useIndexFilter()

    const selectedType = useAppSelector(selectSelectedType)
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const { data, isLoading, isFetching, error } = useGetProductsQuery(
        requestMeta,
        {
            skip: !requestMeta.page_size,
        }
    )

    useEffect(() => {
        if (data) {
            dispatch(appendPaginatedData(data.results))
        }
    }, [data, dispatch])


    // Sync state with query params
    useSyncQueryParamsWithState()
    useSyncStateWithQueryParams()

    const loadMoreRef = useInfiniteScroll<IProduct>(isFetching, data)
    const paginatedData = useAppSelector(selectPaginatedData)
    useEffect(() => {
        if (error) {
            toast.error({ title: 'Error' })
        }
    }, [error])
    return (
        <div>
            <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} />
            <main className="mx-auto">
                <CatalogHeader setMobileFiltersOpen={setMobileFiltersOpen} />
                {/* Search Field */}
                <SearchBar handleSearchChange={handleSearchChange} isLoading={isLoading || isFetching} />
                <section aria-labelledby="products-heading" className="pb-24 pt-2">
                    <h2 id="products-heading" className="sr-only">
                        Products
                    </h2>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                        <Filter />
                        {/* Product grid */}
                        <div className="lg:col-span-4">
                            <div className="col-span-full">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                                    {selectedType?.name || 'All'}
                                </h1>
                            </div>
                            <ProductGrid products={paginatedData || []} isLoading={isLoading} />
                            {/* Load more reference div */}
                            <div ref={loadMoreRef}></div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ProductsPage
