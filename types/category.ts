export enum Category {
  HEALTH = "HEALTH",
  FINANCE = "FINANCE",
  WORK = "WORK",
  LEARNING = "LEARNING",
  SOCIAL = "SOCIAL",
}

export const categoryLabel: Record<Category, string> = {
  HEALTH: "Kesehatan",
  FINANCE: "Keuangan",
  WORK: "Pekerjaan",
  LEARNING: "Belajar",
  SOCIAL: "Sosial",
};

export const categoryValues = Object.values(Category);
