import { ICategory } from '../../features/category/categoryApiSlice'
import { IProductType } from '../../features/productTypes/productTypesApiSlice'

interface NavigationCategory {
    id: number
    name: string
    sections: NavigationSection[]
}

interface NavigationSection {
    name: string
    items: NavigationItem[]
    id: string
}

interface NavigationItem {
    name: string
    id: string
}

// Define the function to map types and categories to the navigation data
export const mapNavigationData = (categories: ICategory[], types: IProductType[]): {
    categories: NavigationCategory[]
    pages: { name: string; href: string }[]
} => {
    // Create a map of type ID to type name
    const typeMap = new Map<number, string>()
    types.forEach(type => {
        typeMap.set(type.id, type.name)
    })

    // Create a map to group categories by type
    const categoryMap = new Map<number, NavigationSection[]>()
    const sectionMap = new Map<number, NavigationSection>()

    // Initialize sections
    categories.forEach(category => {
        if (!category.parent) {
            if (!categoryMap.has(category.product_type)) {
                categoryMap.set(category.product_type, [])
            }
            const section: NavigationSection = {
                name: category.name,
                items: [],
                id: category.id.toString(),
            }
            categoryMap.get(category.product_type)!.push(section)
            sectionMap.set(category.id, section)
        }
    })

    // Map each category to its parent section
    categories.forEach(category => {
        if (category.parent) {
            const parentCategory = categories.find(c => c.id === category.parent)
            if (parentCategory) {
                const parentSection = sectionMap.get(parentCategory.id)
                if (parentSection) {
                    parentSection.items.push({
                        name: category.name,
                        id: `/${category.id}`,
                    })
                }
            }
        }
    })

    // Convert the category map to the final navigation structure
    const navigationCategories: NavigationCategory[] = []
    categoryMap.forEach((sections, typeId) => {
        navigationCategories.push({
            id: typeId,
            name: typeMap.get(typeId) || 'Unknown',
            sections,
        })
    })

    return {
        categories: navigationCategories,
        pages: [
            { name: 'Company', href: '/company' },
            { name: 'Stores', href: '/stores' },
            // Add more static pages if needed
        ],
    }
}
