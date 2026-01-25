import { Frequency } from "./frequency";
import { CategoryName } from "./category";

export type Habit = {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  categoryName: CategoryName;
  frequency: Frequency;
  startDate: string;
  createdAt: string;

  isHabitChecked: boolean; 
};
