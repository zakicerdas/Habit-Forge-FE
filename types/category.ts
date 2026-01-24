export enum CategoryName {
    HEALTHY = "HEALTHY",
    LEARNING = "LEARNING",
    FINANCE = "FINANCE",
    WORK = "WORK",
    SOCIAL = "SOCIAL",
}

export interface Category {
    id: string
    name: CategoryName
    displayName: string
    description?: string
    color?: string
    icon?: string
}

// Display names untuk UI
export const categoryDisplayNames: Record<CategoryName, string> = {
    [CategoryName.HEALTHY]: "Kesehatan",
    [CategoryName.LEARNING]: "Belajar",
    [CategoryName.FINANCE]: "Keuangan",
    [CategoryName.WORK]: "Pekerjaan",
    [CategoryName.SOCIAL]: "Sosial",
}