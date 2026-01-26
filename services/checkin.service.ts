import api from "./api";
import { CheckIn } from "../types/checkIn";

export const checkInHabit = async (
  habitId: string,
  date: string
): Promise<CheckIn> => {
  const res = await api.post("/checkIn", {
    habitId,
    date,
  });

  return res.data.data;
};
