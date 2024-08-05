import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import {FC} from 'react'

import { useGetAttributesQuery } from '../../features/Attributes/attributesApiSlice'
import { useGetCategoriesQuery } from '../../features/category/categoryApiSlice'
import { useGetProductTypesQuery } from '../../features/productTypes/productTypesApiSlice'
import {useFilterUI} from './hooks/useFilterUI'

interface Option {
    value: string
    label: string
    checked: boolean
}

interface FilterSection {
    id: string
    name: string
    options: Option[]
}

interface FilterProps {
    filters?: FilterSection[]
}

const Filter: FC<FilterProps> = () => {
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
        <form className="hidden lg:block">
            <div onClick={handleResetFilters} className="px-4 py-3 cursor-pointer bg-indigo-200 rounded-t-md">Reset Filters</div>
            <h3 className="sr-only">Categories</h3>
            <ul role="list" className="space-y-2 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                <li
                    key="all"
                    className={classNames('p-2', selectedType.id === null && 'bg-gray-100 rounded-md')}
                    onClick={(e) => {
                        e.preventDefault()
                        handleTypeClick(null, 'All')
                    }}
                >
                    <span>All</span>
                </li>
                {types?.map(type => (
                    <li
                        key={type.id}
                        className={classNames('p-2', selectedType.id === type?.id && 'bg-gray-100 rounded-md')}
                        onClick={(e) => {
                            e.preventDefault()
                            handleTypeClick(type.id, type.name)
                        }}
                    >
                        <span>{type.name}</span>
                    </li>
                ))}
            </ul>

            <Disclosure as="div" key={'categories'} className="border-b border-gray-200 py-6">
                {({ open }) => (
                    <>
                        <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
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
                            <div className="space-y-4">
                                {categories?.map(category => (
                                    <div key={category.id} className="flex items-center">
                                        <input
                                            id={`filter-category-${category.id}`}
                                            name={'category[]'}
                                            value={category.id}
                                            type="checkbox"
                                            checked={selectedCategories?.some(selectedCategory => selectedCategory.id === category.id)}
                                            onChange={() => handleCategoryClick(category.id, category.name)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor={`filter-category-${category.id}`} className="ml-3 text-sm text-gray-700">
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <Disclosure as="div" key={'attributes'} className="border-b border-gray-200 py-6">
                {({ open }) => (
                    <>
                        <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
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
                            <div className="space-y-4">
                                {attributes?.map(attribute => (
                                    <div key={attribute.id} className="space-y-2">
                                        {/* Render as a checkbox if there are no choices */}
                                        {(!attribute.choices?.choices || attribute.choices.choices.length === 0) ? (
                                            <div className="flex items-center border-t pt-4">
                                                <input
                                                    id={`filter-attribute-${attribute.id}`}
                                                    name={`attribute-${attribute.id}`}
                                                    value={attribute.name}
                                                    type="checkbox"
                                                    checked={Boolean(selectedAttributes[attribute.name]?.[0])}
                                                    onChange={() => handleCheckboxChange(attribute.name, !selectedAttributes[attribute.name]?.[0])}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label htmlFor={`filter-attribute-${attribute.id}`} className="ml-3 text-sm text-gray-700 capitalize">
                                                    {attribute.name}
                                                </label>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="font-medium text-gray-900 mb-2 capitalize">{attribute.name}</div>
                                                {attribute.data_type === 'choice' && attribute.choices?.choices && attribute.choices.choices.map(choice => (
                                                    <div key={choice} className="flex items-center mb-2 capitalize">
                                                        <input
                                                            id={`filter-attribute-${attribute.id}-${choice}`}
                                                            name={`attribute-${attribute.id}[]`}
                                                            value={choice}
                                                            type="checkbox"
                                                            checked={selectedAttributes[attribute.name]?.includes(choice) ?? false}
                                                            onChange={() => handleCheckboxChange(attribute.name, choice)}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label htmlFor={`filter-attribute-${attribute.id}-${choice}`} className="ml-3 text-sm text-gray-700">
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
    )
}

export default Filter
