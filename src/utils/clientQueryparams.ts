// utils/queryParams.ts
export const getQueryParams = (search: string) => {
    const params = new URLSearchParams(search)
    const typeId = params.get('type')
    const categories = params.getAll('categories')
    const attributes = params.getAll('attributes')

    return {
        type: typeId ? { id: parseInt(typeId, 10), name: '' } : null,
        categories: categories.map(cat => ({ id: parseInt(cat, 10), name: '' })),
        attributes: attributes.reduce((acc, attr) => {
            const [key, value] = attr.split(':')
            if (!acc[key]) {acc[key] = []}
            // Convert 'true' and 'false' to boolean values
            acc[key].push(value === 'true' ? true : value === 'false' ? false : value)
            return acc
        }, {} as { [key: string]: (string | boolean)[] })
    }
}


export const buildQueryParams = (filters: {
    selectedType: { id: number | null; name: string | null }
    selectedCategories: { id: number; name: string }[]
    selectedAttributes: { [key: string]: (string | boolean)[] }
}) => {
    const params = new URLSearchParams()
    if (filters.selectedType?.id !== null) {
        params.set('type', filters.selectedType?.id.toString())
    }
    filters.selectedCategories.forEach(cat => params.append('categories', cat.id.toString()))
    Object.entries(filters.selectedAttributes).forEach(([key, values]) => {
        values.forEach(value => {
            // Convert boolean values to 'true' or 'false' strings
            params.append('attributes', `${key}:${value === true ? 'true' : value === false ? 'false' : value}`)
        })
    })
    return params.toString()
}
