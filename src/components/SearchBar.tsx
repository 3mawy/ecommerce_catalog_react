import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { debounce } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { MIN_SEARCH_LENGTH } from '../configs/client'
import { selectSearch } from "../features/filter/filterSlice"
import { useIndexFilter } from "../features/filter/hooks/useIndexFilter"

const SearchBar: React.FC = () => {
    const { handleSearchChange } = useIndexFilter()

    // Get the initial value from Redux but use local state for the input
    const reduxSearchInput = useSelector(selectSearch)
    const [searchInput, setSearchInput] = useState(reduxSearchInput) // Local state for immediate input reflection

    // Ref to store the debounced function
    const debouncedSearchRef = useRef(debounce((value: string) => {
        handleSearchChange(value) // Call the passed in search handler after debounce
    }, 300))

    useEffect(() => {
        // Ensure debounced function is cleaned up on unmount
        const debouncedSearch = debouncedSearchRef.current
        return () => {
            debouncedSearch.cancel() // Cleanup debounce function
        }
    }, [])

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        // Update local state immediately to reflect input changes
        setSearchInput(value)

        // Call the debounced function if the input meets the minimum length
        if (value.length >= MIN_SEARCH_LENGTH) {
            debouncedSearchRef.current(value)
        } else {
            debouncedSearchRef.current.cancel()
            handleSearchChange('') // Reset search state if input is too short
        }
    }

    // Synchronize local state with Redux state if it changes outside of input (e.g., on page refresh)
    useEffect(() => {
        setSearchInput(reduxSearchInput)
    }, [reduxSearchInput])

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search Catalog"
                value={searchInput} // Use local state for immediate input updates
                onChange={handleSearchInputChange} // Handle typing and updating the local state
                className="h-11 bg-gray-150 block w-full rounded-md border-0 py-1.5 pl-10 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
            />
            <div className="focus:outline-none absolute left-2 top-1/2 transform -translate-y-1/2">
                <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700"/>
            </div>
        </div>
    )
}

export default SearchBar
