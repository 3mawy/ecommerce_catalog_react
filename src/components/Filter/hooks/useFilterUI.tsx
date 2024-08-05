import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../app/hooks'
import { selectSelectedAttributes, selectSelectedCategories, selectSelectedType } from '../../../features/filter/filterSlice'
import { useIndexFilter } from '../../../features/filter/hooks/useIndexFilter'
import { resetData } from '../../../features/pagination/paginationSlice'

// Define the type for attribute values
type AttributeValue = string | boolean;
type AttributesMap = { [key: string]: AttributeValue | AttributeValue[] };

export const useFilterUI = () => {
    const {
        handleTypeChange,
        handleCategoryChange,
        handleCategoryRemove,
        handleCategoryAdd,
        handleAttributesChange,
        handleResetFilters,
    } = useIndexFilter()

    const selectedType = useAppSelector(selectSelectedType)
    const selectedCategories = useAppSelector(selectSelectedCategories)
    const selectedAttributes = useAppSelector(selectSelectedAttributes)

    const [localAttributes, setLocalAttributes] = useState<AttributesMap>({})

    useEffect(() => {
        setLocalAttributes(selectedAttributes)
    }, [selectedAttributes])

    const {
        handleSetPage
    } = useIndexFilter()
    const dispatch = useDispatch()

    const handleTypeClick = (typeId: number | null, typeName?: string) => {
        handleSetPage(1)
        dispatch(resetData())
        handleTypeChange({ id: typeId, name: typeName || 'All' })
        handleCategoryChange([])
    }

    const handleCategoryClick = (categoryId: number, categoryName: string) => {
        handleSetPage(1)
        dispatch(resetData())
        const isSelected = selectedCategories?.some(category => category.id === categoryId)
        if (isSelected) {
            handleCategoryRemove(categoryId)
        } else {
            handleCategoryAdd({ id: categoryId, name: categoryName })
        }
    }

    const handleCheckboxChange = (attributeName: string, value: AttributeValue) => {
        handleSetPage(1)
        dispatch(resetData())
        const updatedAttributes = { ...localAttributes }

        let isSelected = false
        const currentAttribute = updatedAttributes[attributeName]

        if (Array.isArray(currentAttribute)) {
            isSelected = currentAttribute.includes(value as string)
        } else if (typeof currentAttribute === 'string') {
            isSelected = currentAttribute === value
        } else {
            isSelected = false
        }

        // Update the local attributes state
        updatedAttributes[attributeName] = isSelected ? [] : [value]
        setLocalAttributes(updatedAttributes)

        handleAttributesChange(attributeName, value, isSelected)
    }


    return {
        selectedType,
        selectedCategories,
        selectedAttributes,
        localAttributes,
        handleTypeClick,
        handleCategoryClick,
        handleCheckboxChange,
        handleResetFilters,
    }
}
