import React from "react"
import { Button } from "react-native"
import { Habit } from "../../types/habit"

type Props = {
  habit: Habit
  isChecked: boolean
  onCheckedIn: (habitId: string) => void
}

export default function CheckInButton({
  habit,
  isChecked,
  onCheckedIn,
}: Props) {
  return (
    <Button
      title={isChecked ? "Sudah Check-in" : "Check-in"}
      disabled={isChecked}
      onPress={() => onCheckedIn(habit.id)}
    />
  )
}
