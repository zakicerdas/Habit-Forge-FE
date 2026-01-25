import React from "react"
import { Button, Alert } from "react-native"
import { checkInHabit } from "../../services/checkin.service"
import { Habit } from "../../types/habit"

type Props = {
  habit: Habit
  isChecked: boolean
  onCheckedIn: () => void
}

export default function CheckInButton({ habit, isChecked, onCheckedIn }: Props) {
  const onCheckIn = async () => {
    try {
      await checkInHabit(habit.id)
      onCheckedIn()
    } catch (e) {
      console.error(e)
      Alert.alert("Error", "Gagal check-in habit")
    }
  }

  return (
    <Button
      title={isChecked ? "Sudah Check-in" : "Check-in"}
      disabled={isChecked}
      onPress={onCheckIn}
    />
  )
}
