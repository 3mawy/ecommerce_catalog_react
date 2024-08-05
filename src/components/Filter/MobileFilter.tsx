import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import {Dispatch, FC, Fragment, SetStateAction} from 'react'

import { useGetAttributesQuery } from '../../features/Attributes/attributesApiSlice'
import { useGetCategoriesQuery } from '../../features/category/categoryApiSlice'
import { useGetProductTypesQuery } from '../../features/productTypes/productTypesApiSlice'
import { useFilterUI } from './hooks/useFilterUI'

interface FilterProps {
    mobileFiltersOpen: boolean
    setMobileFiltersOpen: Dispatch<SetStateAction<boolean>>
}

const MobileFilter: FC<FilterProps> = ({ mobileFiltersOpen, setMobileFiltersOpen }) => {
    const {
        selectedType,
        selectedCategories,
        selectedAttributes,
        handleTypeClick,
        handleCategoryClick,
        handleCheckboxChange,
        handleResetFilters,
    } = useFilterUI()

    const { data: types, isLoading: isLoadingTypes, error: errorTypes } = useGetProductTypesQuery({})
    const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useGetCategoriesQuery({ filters: { product_type: selectedType?.id } })
    const { data: attributes, isLoading: isLoadingAttributes, error: errorAttributes } = useGetAttributesQuery({})

    if (isLoadingTypes || isLoadingCategories || isLoadingAttributes) {return <div>Loading...</div>}
    if (errorTypes || errorCategories || errorAttributes) {return <div>Error loading data</div>}

    return (
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={() => setMobileFiltersOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <form className="mt-4 border-t border-gray-200">
                                <div onClick={handleResetFilters} className="px-4 py-3 cursor-pointer text-blue-500">Reset Filters</div>

                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                    <li
                                        key="all"
                                        className={`block px-2 py-3 ${selectedType.id === null ? 'bg-gray-100 rounded-md' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleTypeClick(null, 'All')
                                        }}
                                    >
                                        All
                                    </li>
                                    {types?.map(type => (
                                        <li
                                            key={type.id}
                                            className={`block px-2 py-3 ${selectedType.id === type.id ? 'bg-gray-100 rounded-md' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleTypeClick(type.id, type.name)
                                            }}
                                        >
                                            {type.name}
                                        </li>
                                    ))}
                                </ul>

                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-mx-2 -my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">Categories</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-6">
                                                    {categories?.map(category => (
                                                        <div key={category.id} className="flex items-center w-full">
                                                            <input
                                                                id={`filter-mobile-category-${category.id}`}
                                                                name={'category[]'}
                                                                value={category.id}
                                                                type="checkbox"
                                                                checked={selectedCategories?.some(selectedCategory => selectedCategory.id === category.id)}
                                                                onChange={() => handleCategoryClick(category.id, category.name)}
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label
                                                                htmlFor={`filter-mobile-category-${category.id}`}
                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                            >
                                                                {category.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>

                                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                                    {({ open }) => (
                                        <>
                                            <h3 className="-mx-2 -my-3 flow-root">
                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">Attributes</span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                    </span>
                                                </Disclosure.Button>
                                            </h3>
                                            <Disclosure.Panel className="pt-6">
                                                <div className="space-y-6">
                                                    {attributes?.map(attribute => (
                                                        <div key={attribute.id} className="w-full">
                                                            {(!attribute.choices?.choices || attribute.choices.choices.length === 0) ? (
                                                                <div className="flex items-center border-t pt-4 w-full">
                                                                    <input
                                                                        id={`filter-mobile-attribute-${attribute.id}`}
                                                                        name={`attribute-${attribute.id}`}
                                                                        value={attribute.name}
                                                                        type="checkbox"
                                                                        checked={Boolean(selectedAttributes[attribute.name]?.[0])}
                                                                        onChange={() => handleCheckboxChange(attribute.name, !selectedAttributes[attribute.name]?.[0])}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label htmlFor={`filter-mobile-attribute-${attribute.id}`} className="ml-3 min-w-0 flex-1 text-gray-500">
                                                                        {attribute.name}
                                                                    </label>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className="font-medium text-gray-900 mb-2 ">{attribute.name}</div>
                                                                    {attribute.data_type === 'choice' && attribute.choices?.choices && attribute.choices.choices.map(choice => (
                                                                        <div key={choice} className="flex items-center mb-2 w-full py-2 ">
                                                                            <input
                                                                                id={`filter-mobile-attribute-${attribute.id}-${choice}`}
                                                                                name={`attribute-${attribute.id}[]`}
                                                                                value={choice}
                                                                                type="checkbox"
                                                                                checked={selectedAttributes[attribute.name]?.includes(choice) ?? false}
                                                                                onChange={() => handleCheckboxChange(attribute.name, choice)}
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label htmlFor={`filter-mobile-attribute-${attribute.id}-${choice}`} className="ml-3 min-w-0 flex-1 text-gray-500">
                                                                                {choice}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default MobileFilter
