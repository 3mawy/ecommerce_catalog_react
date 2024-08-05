import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import {useAppSelector} from '../app/hooks'
import {
    selectSelectedAttributes,
    selectSelectedCategories,
    selectSelectedType, setSelectedAttributes, setSelectedCategories,
    setSelectedType
} from '../features/filter/filterSlice'
import {buildQueryParams, getQueryParams} from '../utils/clientQueryparams'


export const useSyncQueryParamsWithState = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const selectedType= useAppSelector(selectSelectedType)

    useEffect(() => {
        const { type, categories, attributes } = getQueryParams(location.search)
        type && dispatch(setSelectedType({name:selectedType.name, id:type.id}))
        dispatch(setSelectedCategories(categories))
        dispatch(setSelectedAttributes(attributes))
    }, [location.search, dispatch])

}
export const useSyncStateWithQueryParams = () => {
    const navigate = useNavigate()
    const selectedType = useAppSelector(selectSelectedType)
    const selectedCategories = useAppSelector(selectSelectedCategories)
    const selectedAttributes = useAppSelector(selectSelectedAttributes)

    useEffect(() => {
        const queryParams = buildQueryParams({
            selectedType,
            selectedCategories,
            selectedAttributes
        })
        navigate({ search: queryParams }, { replace: true })
    }, [selectedType, selectedCategories, selectedAttributes, navigate])
}
