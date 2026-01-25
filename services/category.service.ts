import api from "./api"
import { Category } from "../types/category"

export const getCategories = async (): Promise<Category[]> => {
    const res = await api.get("/category")
    return res.data.data
}