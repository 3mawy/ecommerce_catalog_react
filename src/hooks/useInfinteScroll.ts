import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../app/hooks'
import {IResponse} from '../configs/client'
import { selectPage, setCurrentPage } from '../features/pagination/paginationSlice'


const useInfiniteScroll = <T>(isFetching: boolean, data: IResponse<T> | undefined) => {
    const loadMoreRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch()
    const page = useAppSelector(selectPage)

    useEffect(() => {
        const currentLoadMoreRef = loadMoreRef.current

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isFetching) {
                    if (data?.meta && page < data.meta.num_pages) {
                        console.log(page)
                        dispatch(setCurrentPage(page + 1))
                    }
                }
            },
            {
                rootMargin: '100px', // Adjust as needed
            }
        )

        if (currentLoadMoreRef) {
            observer.observe(currentLoadMoreRef)
        }

        return () => {
            if (currentLoadMoreRef) {
                observer.unobserve(currentLoadMoreRef)
            }
        }
    }, [isFetching, page, data?.meta, dispatch])

    return loadMoreRef
}

export default useInfiniteScroll
