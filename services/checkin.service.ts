import api from "./api"
import { CheckIn } from "../types/checkIn"

export const checkInHabit = async (
  habitId: string
): Promise<CheckIn> => {
  const res = await api.post("/checkIn", { habitId })
  return res.data.data
}
