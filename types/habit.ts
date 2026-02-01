import { Frequency } from "./frequency";
import { Category } from "./category";

export type TodayHabit = {
  id: string;
  title: string;
  description: string | null;
  frequency: Frequency;
  isActive: boolean;
  category: Category | null;
  startDate: string;

  isCheckedToday: boolean;
  canCheckInToday: boolean;
  todayCheckIn?: {
    id: string;
    date: string;
    note?: string | null;
  } | null;
};
