import { Frequency } from "./frequency";
import { Category } from "./category";
import { CheckIn } from "./checkIn";

export type Habit = {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  category: Category;
  frequency: Frequency;
  startDate: string;
  createdAt: string;
  checkIn?: CheckIn[];
};
