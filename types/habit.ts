import { Frequency } from "./frequency";
import { CategoryName } from "./category";
import { CheckIn } from "./checkIn";

export type Habit = {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  categoryName: CategoryName;
  frequency: Frequency;
  startDate: string;
  createdAt: string;
  checkIn?: CheckIn[];
};
