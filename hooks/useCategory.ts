import { useEffect, useState } from "react"
import { Category } from "../types/category"
import { CATEGORIES } from "../constants/categories"

export function useCategory() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        try {
            setLoading(true)
            setCategories(CATEGORIES as unknown as Category[])
        } catch {
            setError("Failed to load categories")
        } finally {
            setLoading(false)
        }
    }

    return { categories, loading, error }
}
