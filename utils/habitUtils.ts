
export function isHabitCheckedToday(habitId: string, checkedTodayIds: string[]): boolean {
  return checkedTodayIds.includes(habitId);
}
